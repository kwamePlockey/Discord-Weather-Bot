require('dotenv').config()
const fs = require('node:fs')
const  token  = process.env.DISCORD_TOKEN

//TO-DO : VIEW INTERACTION OBJECT

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

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

//Command execution
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);
	if(!command) return;

	try {
		await command.execute(interaction)
	} catch (error) {
		console.error(error)
		await interaction.reply({ content: 'An error occured while executing this command!'});
	}

});

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});



// Log in to Discord with your client's token
client.login(token);