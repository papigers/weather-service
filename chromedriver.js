var chrome = require('selenium-webdriver/chrome'),
  By = require('selenium-webdriver').By,
  until = require('selenium-webdriver').until;;

var debug = require('debug');

var debugdb = debug('db');
var debugwd = debug('webdriver');

var mongoose = require('mongoose');

var WeatherDay = require('./models/WeatherDay');

mongoose.connect('mongodb://weather:1234567@ds029675.mlab.com:29675/weather-service');

mongoose.connection.on('error', function(err) {
  debugdb(err);
});
mongoose.connection.once('connected', function() {
  debugdb('connected to database');
});

var service = new chrome.ServiceBuilder()
  .build();

var options = new chrome.Options();

var driver = new chrome.Driver(options, service);

function startWebDriver() {
  getWeather();
  setInterval(getWeather, 1000*60*60);
}

function getWeather() {
  debugwd("Getting Weather", new Date());
  driver.get('http://openweathermap.org/find?q=Jerusalem');
  driver.isElementPresent(By.className('badge-info')).then(function (present) {
    if(present){
      var x = driver.findElement(By.className('badge-info')).getText().then(function(text) {
        var weather = text.substring(0, text.length - 2);
        debugwd(weather);
        WeatherDay.setWeatherDayHour(new Date(), weather, debugwd);
      });
    }
  });
}

module.exports = startWebDriver;
