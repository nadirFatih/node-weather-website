const request = require('request');

const forecast = (lan,lon,callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=ae4cbc4b7a1cd57dadc589f518b8c2da&query=' + lan +',' + lon;

    request({url:url,json:true},(error,response)=>{

            if(error){
                callback('Unable To Conncet To Weather Service',undefined);
            }else if(response.body.error){
                callback('Ubable To Find Location',undefined)
            }else {
                const data = {
                    currentTemp: response.body.current.temperature,
                    currentFeelLike:response.body.current.feelslike
                }
                callback(undefined,data)
            }
        

    })


}

module.exports = forecast