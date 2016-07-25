var app = angular.module("weatherService", ['ui.materialize']);

app.controller("weatherCtrl", function ($scope) {
  
  $scope.date = new Date();
  
  $scope.changeDate = function(){
    console.log($scope.date);
  }
  
//  var datePicker = $('.datepicker').pickadate({
//    selectMonths: true,
//  });
//
//  datePicker.pickadate('picker').set('select', new Date());
  
  drawChart();
});