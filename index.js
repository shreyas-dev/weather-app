const yargs=require('yargs');
const geocode=require('./geocode/geocode');
const weather=require('./weather/weather');
const argv=yargs.options({
  a:{
    demand:true,
    alias:'address',
    describe:'Address to fetch whether for',
    string : true
  }
}).help().alias('help','h').argv;

geocode.geocodeAddress(argv.address,(errorMessage,body)=>{
  if(errorMessage)
    console.log(errorMessage);
  else {
      //console.log(JSON.stringify(body,undefined,2));
      console.log("Results showing for address:"+body.address);
      console.log("Latitude:"+body.lat);
      console.log("Longitude:"+body.lng);
      weather.getWeather(body.lat,body.lng,(errorMessage,weatherData)=>{
          console.log('TimeZone: '+weatherData.timezone);
          console.log('Current temperature: '+weatherData.currently.temperature);
          console.log('Current Apparent Temperature: '+weatherData.currently.apparentTemperature);
          console.log('Current Humidity: '+weatherData.currently.humidity);
          console.log('Prediction: '+weatherData.hourly.summary);
      });
    }
});
