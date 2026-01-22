const { SlashCommandBuilder } = require('discord.js');
const { getDailyWeatherUpdates } = require('../botFunctions/main');
const {subscriptionMessage} = require('../botFunctions/controllers.js/constants')
const cityExists = require('../botFunctions/controllers.js/fetchForecastAPI')

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
    await interaction.deferReply() // extends expected response time from 3secs to 15mins; 
		
    const city = interaction.options.getString('city')
    .toLowerCase()
    .replace(/\.$/gi, '');
     
    try {
      if(await cityExists(city)){
          interaction.editReply(subscriptionMessage.DAILY_WEATHER_UPDATES(city));
        }

        //set-up cron
        //const weatherData = await getDailyWeatherUpdates(city);
    } catch (error) {
      console.error(error)
      await interaction.editReply(error.message);
    }  

  },
};