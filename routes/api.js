var express = require('express');
var router = express.Router();
var WeatherDay = require('../models/WeatherDay');

router.get('/weather/:date', function(req, res, next) {
  console.log(req.params.date);
  WeatherDay.getWeatherDay(req.params.date, function(err, res) {
    if(err) {
      res.json({error: err});
    }
    res.json(res);
  })
});

module.exports = router;