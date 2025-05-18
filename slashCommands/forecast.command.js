const { SlashCommandBuilder } = require('discord.js');
const { getWeatherForecast } = require('../botFunctions/main');

// TO-DO: Parse options for city & weekday params
const forecastSlashCommand = new SlashCommandBuilder()
  .setName('forecast')
  .setDescription('Returns weather forecast for specified city and weekday');

module.exports = {
  data: forecastSlashCommand,
  async execute(interaction) {
    const weatherData = await getWeatherForecast("Tamale", "friday");
    await interaction.reply(weatherData);
  },
};
