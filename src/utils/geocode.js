const request = require('request');

const geocode = (adress,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ adress + '.json?access_token=pk.eyJ1IjoiZmF0aWh5aWxtYXoiLCJhIjoiY2s5N2Q0bDBtMGdtajNlcnMzeGwxaXhjMSJ9.WS_EZ8wh_iR5nqL0LnWj9g';
  
    request({url:url,json:true},(error,response)=>{
      if(error){
        callback('Unable To Connect to Loacation Service',undefined);
      }else if(response.body.features.length === 0){
        callback('Unable to find adress',undefined);
      }else{
        
        const data = {
          latitude: response.body.features[0].center[1],
          longitude: response.body.features[0].center[0],
          location: response.body.features[0].place_name
      }
        callback(undefined,data)
      }
  
    })
  
  }


  module.exports = geocode
