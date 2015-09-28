angular.module('getLostApp', ['lumx']).
controller('MainCtrl', function($rootScope, $scope, $http) {

  // Get the cities data that I can show in the drop-down
  $http.get('/api/v1/cities').success(function(data) {
    $scope.cities = (JSON.parse(data.info)).Cities;
    console.log($scope.cities);
  }).error(function(err) {
    $scope.error = err;
  });

  // Set some prices that I can show in the prices drop-down
  $scope.prices = [
    {show:'$200', value:200},
    {show:'$300', value:300},
    {show:'$400', value:400},
    {show: '$500', value:500}
  ];

  // Initialize this with what to show when the page is loaded
  $scope.info = {
    origin: {
      name: 'New York City',
      code: 'NYC'
    },
    maxfare: {
      show: '$500',
      value: 500
    },
    returndate: '2015-09-30',
    departuredate: '2015-09-29'
  };

  // Call the server to get the fares info
  $scope.submit = function() {
    $http.get('/api/v1/places?origin=' + $scope.info.origin.code +
      '&departuredate=' + formatDate($scope.info.departuredate) +
      '&returndate=' + formatDate($scope.info.returndate) +
      '&maxfare=' + $scope.info.maxfare.value).success(function(data) {
        $scope.results = data;
        $scope.data = data.info;
        if ($scope.results.status) {
          $scope.fareinfo = JSON.parse($scope.data).FareInfo;
        } else {
          $scope.error = JSON.parse($scope.data.data).message;
        }
    }).error(function(err) {
      $scope.error = JSON.parse(err.data).message;
    });
  };

  // Helper function from stackoverflow so that I can format the date before sending to the server
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }
});
