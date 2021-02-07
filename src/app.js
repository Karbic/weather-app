const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define Express paths
const publicFolder = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setting up Handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setting up static folder
app.use(express.static(publicFolder));

console.log();

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Denis'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Denis'
    });
});

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'Address has to be provided'
        })
    } 
    
    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            
            res.send({
                location: location,
                forecast: forecastData
            });
        });
    });
      
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Denis',
        message: 'Need some help?'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Denis'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});