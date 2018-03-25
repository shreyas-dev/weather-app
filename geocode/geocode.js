const request=require('request');
const geocodeAddress=(address,callback)=>{
  var encodedAddresss=encodeURIComponent(address);
  request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddresss}`,
    json:true
  },(error,request,body)=>{
    if(error){
      callback('Unable to connect to Google servers');
    }
    else if(body.status==='ZERO_RESULTS'){
      callback('Unable to find the given address');
    }else if(body.status==='OVER_QUERY_LIMIT'){
      geocodeAddress(address,callback);
    }
    else{
      callback(undefined,{
        address:body.results[0].formatted_address,
        lat:body.results[0].geometry.location.lat,
        lng:body.results[0].geometry.location.lng
      });
    }
  });
}

module.exports.geocodeAddress=geocodeAddress;
