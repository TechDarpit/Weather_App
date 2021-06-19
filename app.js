const weatherApp = angular.module("weatherApp",[]);

http:
weatherApp.run(function($rootScope,$http){
    $http.get("http://api.openweathermap.org/data/2.5/box/city?bbox=70,20,75,25,8&appid=fc03aceb65de04bdbba2db09025c42da")
    .then(
        function(responce){
            $rootScope.weathers = responce.data.list;
        },
        function(responce){
            $rootScope.message = $responce.status + "  " + $responce.ststusText;
        }
    );
});

weatherApp.controller("weatherAppController", function($scope){
    $scope.filterText="";
});

weatherApp.filter("searchFilter",function(){
    console.log();
    return function(weathers,filterText){
        if(!filterText){
            return weathers;
        }
        return weathers.filter(function(weather){
            var keyword = new RegExp(filterText,'i');           
            return keyword.test(weather.name);
        });
    };
});