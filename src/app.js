const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecasts')

const app = express()
const port = process.env.PORT || 3000

// Define paths for expess config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to use
app.use(express.static(publicDirectoryPath))



// first arg is route after main domain
// second arg is callack with the request to this route and the response back

app.get('', (req, res) => {
  res.render('index', {
      title: 'Weather app',
      name: 'Andrew'
  })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'me',
        name: 'Andrew'
    })
})
  
app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'send email',
        title: 'Help',
        name: 'Andrew'
    })
  })


app.get('/weather', (req, res) => {
    location = req.query.location
    if(!location){
        return res.send({
          error: 'must provide location'
        })
    }
    geocode(location, (error, {latitude, longitude, place_name}={}) => {
        if(error){
            return res.send({
                error:  error
            })
        } 
        forecast(latitude, longitude, (error, {description, temperature, feelslike}={}) => {
          if(error){
           return  res.send({
            error:  error
             })
          } 
          res.send({
            description: description,
            temperature: temperature,
            feelslike: feelslike,
            address: location,
            latitude: latitude,
            longitude: longitude
            })
        })
      })
   
})

// * match anything(not matched before)
app.get('*', (req,res) => {
    res.render('404', {
        errorMsg: 'Page not found.',
        title: '404',
        name: 'Andrew'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port) //runs after app is running
}) // starts the server async process