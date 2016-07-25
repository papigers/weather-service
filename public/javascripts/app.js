var app = angular.module("weatherService", ['ui.materialize']);

app.controller("weatherCtrl", ['$scope', '$http', function ($scope, $http) {

  $scope.noData = false;
  $scope.date = new Date();

  $scope.changeDate = function () {
    var config = {
      headers: {
        'Accept': 'application/json'
      }
    };

    $http.get('/api/v1/weather/' + new Date($scope.date).getTime(), config).then(function (res) {
      if(res.data != null) {
        $scope.noData = false;
        drawChart(res.data);
      }
      else {
        $scope.noData = true;
      }
    }, function (err) {
      console.log("Error:", err);
    });
  }

  $scope.changeDate();

}]);
