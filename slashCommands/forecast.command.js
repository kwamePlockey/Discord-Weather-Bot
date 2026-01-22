const { SlashCommandBuilder } = require('discord.js');
const { getWeatherForecast } = require('../botFunctions/main');


const forecastSlashCommand = new SlashCommandBuilder()
  .setName('forecast')
  .setDescription('Returns weather forecast for specified city and weekday')
  .addStringOption(option => 
    option.setName('city')
				.setDescription('enter name of city')
				.setRequired(true)
  )
  .addStringOption(option => 
    option.setName('weekday')
				.setDescription('specify weekday')
				.setRequired(true)
  );

module.exports = {
  data: forecastSlashCommand,
  
  async execute(interaction) {
    await interaction.deferReply() // extends expected response time from 3secs to 15mins;

    const city = interaction.options.getString('city')
    .toLowerCase()
    .replace(/\.$/gi, '');


    const weekday = interaction.options.getString('weekday')
    .toLowerCase()
    .replace(/\.$/gi, '');

    try {
      const weatherData = await getWeatherForecast(city, weekday);
      await interaction.editReply(weatherData);
    } catch (error) {
      console.error(error)
      await interaction.editReply(error.message);
    }
  },
};