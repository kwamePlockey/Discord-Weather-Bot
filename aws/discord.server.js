require('dotenv').config();
const fs = require('node:fs');
const cron = require('node-cron');
const dB = require('./mockDB');
const { getDailyWeatherUpdates } = require('./botFunctions/main');
const {scheduledTimeForDailyForecastUpdates} = require('./botFunctions/utilities.js/constants');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const token  = process.env.DISCORD_TOKEN;
const channel_id = process.env.CHANNEL_ID;


// Create a new client instance
const client = new Client({ intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.DirectMessages,
] });

//Importing slash commands
client.commands = new Collection()
const commandsFolder = './slashCommands';
fs.readdirSync(commandsFolder).map(file => {
	const filePath = `${commandsFolder}/${file}`;
	const command = require(filePath)
	client.commands.set(command.data.name, command)
})

//Function for cron scheduler 
const pushDailyForecastUpdatesToChannel = async () => {
	const channel = await client.channels.fetch(channel_id);
	const UnresolvedForecastArrayOfEachCity = [...dB].map(city => {
		return getDailyWeatherUpdates(city)
	})	

	const resolvedForecastArrayOfEachCity = await Promise.allSettled(UnresolvedForecastArrayOfEachCity);

	return resolvedForecastArrayOfEachCity.forEach(forecast => channel.send(forecast.value));
}


//Command execution
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);
	if(!command) return;

	try {
		await command.execute(interaction);

	} catch (error) {
		console.error(error)
		await interaction.reply({ content: 'An error occured while executing this command!'});
	}
});



// When the client is ready, run this code (only once).
client.once(Events.ClientReady, async readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

	const timeString = Object.values(scheduledTimeForDailyForecastUpdates).join(' ');
	cron.schedule((timeString), pushDailyForecastUpdatesToChannel);
});


client.login(token);