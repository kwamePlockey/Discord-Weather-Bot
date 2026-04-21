const { SlashCommandBuilder } = require('discord.js');
const { getDailyWeatherUpdates } = require('../botFunctions/main');
const {subscriptionMessage} = require('../botFunctions/controllers.js/constants');
const cityExists = require('../botFunctions/controllers.js/fetchForecastAPI');
const dB = require('../mockDB')
const cron = require("node-cron");

const dailyForecastSlashCommand = new SlashCommandBuilder()
  .setName('subscribe_forecast_daily')
  .setDescription('Returns personalized daily morning forecasts with smart weather features')
  .addStringOption(option => 
    option.setName('city')
				.setDescription('enter name of city')
				.setRequired(true)
)


module.exports = {
  data: dailyForecastSlashCommand,

  async execute(interaction) {
    await interaction.deferReply(); // extends expected response time from 3secs to 15mins; 
		
    const city = interaction.options.getString('city')
    .toLowerCase()
    .replace(/\.$/gi, '');
     
    try {
      if( await cityExists(city) ){
          dB.add(city);
          console.log(dB)
          interaction.editReply( subscriptionMessage.DAILY_WEATHER_UPDATES(city) );
      }

    
    } catch (error) {
      console.error(error)
      await interaction.editReply(error.message);
    }  

  },
}; 
