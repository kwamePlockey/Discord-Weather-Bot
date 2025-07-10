require('dotenv').config()
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env;



const commands = []
//dynamically importing commands from command folder
const commandsFolder = './slashCommands'
fs.readdirSync(commandsFolder).map(file => {
    const command = require(`${commandsFolder}/${file}`)
    commands.push(command.data.toJSON())
})


//script deployment function
const rest = new REST().setToken(DISCORD_TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        
        const route = Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)

        const data = await rest.put(route, 
            {body: commands}
        )

        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    } catch (error) {
        console.error(error)
    }
})()