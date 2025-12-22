const { SlashCommandBuilder } = require('discord.js');
const { getDailyWeatherUpdates } = require('../botFunctions/main');
const {subscriptionMessage} = require('../botFunctions/controllers.js/constants')

const dailyUpdateSlashCommand = new SlashCommandBuilder()
  .setName('subscribe_forecast_daily')
  .setDescription('Returns personalized daily morning forecasts with smart weather features')
  .addStringOption(option => 
    option.setName('city')
				.setDescription('enter name of city')
				.setRequired(true)
)


module.exports = {
  data: dailyUpdateSlashCommand,

  async execute(interaction) {
    const city = interaction.options.getString('city')
    .toLowerCase()
    .replace(/\.$/gi, '');

    try {
        //check if city exists
        interaction.reply(subscriptionMessage.DAILY_WEATHER_UPDATES(city));
        //const weatherData = await getDailyWeatherUpdates(city);

      //set-up cron
    } catch (error) {
      console.error(error)
      await interaction.reply(error.message);
    }


  },
};