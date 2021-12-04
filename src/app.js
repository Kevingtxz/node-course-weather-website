const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials') 
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3000

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kevin Gonçalves',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kevin Gonçalves',
        about: 'about',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kevin Gonçalves',
        help: 'help',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) 
        return res.send({ error: 'You must provide a address' })

    geocode(address_search = req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) return res.send({ error: "Can't find geocode in to the value " + req.query.address + '.' })
        
        forecast(latitude, longitude, (error, { description, temperature, feelslike, weather_icon_link }) => {
            if (error) return res.send(error)
            
            res.send({
                location,
                description,
                temperature,
                feelslike,
                weather_icon_link,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) 
        return res.send({ error: 'You must provide a search term', })
    
    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kevin Gonçalves',
        errorMessage: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kevin Gonçalves',
        errorMessage: 'Not Found',
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})