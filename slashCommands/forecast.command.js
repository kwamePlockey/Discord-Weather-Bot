const { SlashCommandBuilder } = require('discord.js');
const { getWeatherForecast } = require('../botFunctions/main');

// TO-DO: Parse options for city & weekday params
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
    const city = interaction.options.getString('city');
    const weekday = interaction.options.getString('weekday');
    try {
      const weatherData = await getWeatherForecast(city, weekday);
      await interaction.reply(weatherData);
    } catch (error) {
      await interaction.reply(error)
    }
  },
};