const request=require('request');
const getWeather =(lat,lng,callback)=>{
  request({
    url:`https://api.darksky.net/forecast/b0a7e53c4108202a1215a1b29cc2ffc3/${lat},${lng}`,
    json:true
  },(error,resquest,body)=>{
      if(error){
        callback('Unable to connect to servers');
      }else if(request.statusCode==400){
        callback('Code:400,The given location (or time) is invalid.');
      }else if(request.statusCode==404){
        callback('Code:404,Unable to process the location');
      }else{
        callback(undefined,body);
      }
  });
}

module.exports={
  getWeather
}
