var mongoose = require('mongoose');

var debug = require('debug')('WeatherDay');

var schema = new mongoose.Schema({
  day: Date,
  weatherHour: mongoose.Schema.Types.Mixed
});

var WeatherDay = mongoose.model('WeatherDay', schema);

function getWeatherDay(date, cb) {
  var jsDate = new Date(+date);
  var dayDate = new Date(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate(), 0, 0, 0, 0);
  WeatherDay.findOne({ day: dayDate }, function(err, result) {
    if (err) {
      debug(err);
      cb(err);
    }
    debug(result);
    cb(null, result);
  });
}

function setWeatherDayHour(date, weather, cb) {
  var dayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  var update = {};
  update['weatherHour.'+date.getHours()] = weather;
  debug(weather);
  WeatherDay.findOneAndUpdate({ day: dayDate }, { $set: update }, { upsert: true, new: true }, function(err, result) {
    debug(err, result);
    if (err) {
      debug(err);
    }
    debug(result);
  });
}

module.exports = {
  getWeatherDay: getWeatherDay,
  setWeatherDayHour: setWeatherDayHour,
  model: WeatherDay
};
