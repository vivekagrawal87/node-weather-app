const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directories to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vivek Agrawal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vivek Agrawal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Vivek Agrawal',
        helpText: 'Please drop your queries to agr.vik87@gmail.com'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Please specify address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                'forecast' : forecastData,
                location,
                'address' : req.query.address
            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Vivek Agrawal',
        errorMessage: 'Help Text not found'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Vivek Agrawal',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server started at port 3000!')
})