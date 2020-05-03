const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewDirectoryPath = path.join(__dirname,'../templates/views');
const partialDirectoryPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location 
app.set('view engine','hbs');
app.set('views',viewDirectoryPath);
hbs.registerPartials(partialDirectoryPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather-App',
        name:'Fatih Yilmaz'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Fatih Yilmaz'
    });
})

app.get('/help',(req,res)=>{
    res.render('Help',{
        helptext:'This helpful some context',
        title:'Help',
        name:'Fatih Yilmaz'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            errorMessage: 'No Address'
        })
    }
    geocode(req.query.address,(error,data={}) => {

        if(error){
      
          return res.send({error:error});
        }
      
          forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
              return res.send({error:error});
            }

           return res.send({
                forecast:forecastData,
                location: data.location,
                address:req.query.address
            })

          })
          
        
      })
})

app.get('/product',(req,res)=>{

    if(!req.query.search){
        return res.send({
            errorMessage:'You must write product'
        })
    }

    res.send([{

    }]);
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Fatih Yilmaz',
        errorMessage:'Help Article is Not Found!!'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Fatih Yilmaz',
        errorMessage:'Page Not Found!!'
    })
})



app.listen(port,()=>{
    console.log('Server is up on port '+ port);
})
