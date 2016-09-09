
angular.module('app', [])
.controller('AppCtrl', ['$scope', '$window','$http','$location', function($scope, $window, $http, $location) {
    
    $scope.showForm = false;
    $scope.showHash = true;
    $scope.hash =  $location.path().substring(1,$location.path.toString().length);
    //$scope.hash = $window.location.hash.substring(1,$window.location.hash.length);
    var getUrl= 'http://localhost:8383/getqr/' + $scope.hash;
    
    $scope.getQR= function (){  
        $http({
               method: 'GET',
               url: getUrl
               }).then(function successCallback(response) {
                        $scope.message= "Zadany QR kód má tento hash = " + $scope.hash;
               }, function errorCallback(response) {
                        $scope.message= "Zadany QR kód sa nepodarilo nájsť";
               });
    }
    $scope.pairElmnt= function (){
        var postUrl= 'http://localhost:8383/pairqr/' + $scope.hash;
         $http({
                method: 'POST',
                url: postUrl,
                data: {url: 'http://google.com'}
                }).then(function successCallback(response) {
                        $scope.message= "Zadany QR kód bol pridaný";
                }, function errorCallback(response) {
                    $scope.message= "Nepodarilo sa spárovať dáný QR kód";
                });

    }
    
    $scope.newElmnt= function(){
            $scope.showForm= true;
            $scope.showHash = false;
             if (navigator.geolocation) {
                 navigator.geolocation.getCurrentPosition(function(position){
                          $scope.$apply(function(){
                          $scope.location = position.coords.latitude + "," + position.coords.longitude;
                          });
                 });
            }else{
                $scope.location="Nepodporuje geolokaciu";
            }
    }
    
    $scope.sendForm = function(){
        var postUrl= 'http://localhost:8383/newqr/' + $scope.hash;
        if($scope.name != null && $scope.description !=null){
            $http({
                   method: 'POST',
                   url: postUrl,
                   data: {name: $scope.name, description: $scope.description, location: $scope.location}
                   }).then(function successCallback(response) {
                       $scope.message2= "Zadany QR kód bol vytvorený";
                   }, function errorCallback(response) {
                       $scope.message2= "Nepodarilo sa pridať dáný QR kód";
                   });
        }
    }

}]);




