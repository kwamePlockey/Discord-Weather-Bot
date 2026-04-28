const { SlashCommandBuilder } = require('discord.js');
const {subscriptionMessage} = require('../botFunctions/utilities.js/constants');
const fetchForecastAPI = require('../botFunctions/controllers.js/fetchForecastAPI');
const dB = require('../mockDB')

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
      const cityExists = await fetchForecastAPI(city);
      if(cityExists){ 
          const city = cityExists.city.name;
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
