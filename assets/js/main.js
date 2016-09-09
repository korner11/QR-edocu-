
angular.module('app', [])
.controller('AppCtrl', ['$scope', '$window','$http','$location', function($scope, $window, $http, $location) {
    
    $scope.showForm = false;
    $scope.showHash = true;
    $scope.hash =  $location.path().substring(1,$location.path.toString().length);
    //$scope.hash = $window.location.hash.substring(1,$window.location.hash.length);
    if($scope.hash != ""){
            var getUrl= 'http://localhost:8383/getqr/' + $scope.hash;
            //var getUrl= 'http://localhost:8383/getqr/#' + $scope.hash;
            $scope.getQR= function (){  
                $http({
                       method: 'GET',
                       url: getUrl
                       }).then(function successCallback(response) {
                                $scope.message= "QR code hash is = " + $scope.hash;
                       }, function errorCallback(response) {
                                $scope.message= "Sorry! Couldn't find QR code";
                       });
            }
    }else{
      $scope.message = "Please insert QR code"  
    }
    $scope.pairElmnt= function (){
         if($scope.hash != ""){
                var postUrl= 'http://localhost:8383/pairqr/' + $scope.hash;
                //var postUrl= 'http://localhost:8383/pairqr/#' + $scope.hash;
                $http({
                       method: 'POST',
                       url: postUrl,
                       data: {url: 'http://google.com'}
                       }).then(function successCallback(response) {
                               $scope.message= "QR code was paired";
                       }, function errorCallback(response) {
                           $scope.message= "Sorry! Couldn't   find or pair QR code";
                       });
        }else{
             $scope.message = "Please insert QR code"  
        }        
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
                $scope.location="Not supported geolocation";
            }
    }
    
    $scope.sendForm = function(){
       
        if($scope.hash != ""){
            var postUrl= 'http://localhost:8383/newqr/' + $scope.hash;
            //var postUrl= 'http://localhost:8383/newqr/#' + $scope.hash;
            if($scope.name != null && $scope.description !=null){
                $http({
                       method: 'POST',
                       url: postUrl,
                       data: {name: $scope.name, description: $scope.description, location: $scope.location}
                       }).then(function successCallback(response) {
                           $scope.message2= "QR code was created";
                       }, function errorCallback(response) {
                           $scope.message2= "Sorry! Couldn't create QR code";
                       });
            }
        }else{
             $scope.message2 = "Please insert QR code"  
          }  
    }

}]);




