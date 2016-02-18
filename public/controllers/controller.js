// function AppCtrl($scope){
//   console.log("Hello World from controller");
//       person1 = {
//         name : 'Akhil Jayan',
//         email : 'mailtoakjn@gmail.com',
//         number : '9496367890'
//       };
//       person2 = {
//         name : 'Athul Jayan',
//         email : 'athul@gmail.com',
//         number : '9496588544'
//       };
//       person3 = {
//         name : 'Boby',
//         email : 'boby@gmail.com',
//         number : '9874563210'
//       };
//
//       var contactlist = [person1, person2, person3];
//       $scope.contactlist = contactlist;
// }

var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

  var refresh = function(){
    $http.get('/contactlist').success(function(response){
      console.log('Got back the data requested');
      $scope.contactlist = response;
      $scope.contact = "";
    });
  };

  refresh();

    $scope.addContact = function(){
      console.log($scope.contact);
      $http.post('/contactlist',$scope.contact).success(function(responce){
        console.log(responce);
        refresh();
      });
    };

    $scope.remove = function(id){
      console.log(id);
      $http.delete('/contactlist/'+id).success(function(responce){
        refresh();
      });
    };

    $scope.edit = function(id){
      console.log(id);
      $http.get('/contactlist/'+id).success(function(responce){
        $scope.contact = responce;
      });
    };

    $scope.update = function(){
      console.log($scope.contact._id);
      $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(responce){
        refresh();
      });
    };

    $scope.deselect = function(){
      $scope.contact ="";
    }

    console.log("Hello World from controller");
  }]);
    // person1 = {
    //   name : 'Akhil Jayan',
    //   email : 'mailtoakjn@gmail.com',
    //   number : '9496367890'
    // };
    // person2 = {
    //   name : 'Athul Jayan',
    //   email : 'athul@gmail.com',
    //   number : '9496588544'
    // };
    // person3 = {
    //   name : 'Boby',
    //   email : 'boby@gmail.com',
    //   number : '9874563210'
    // };
    //
    // var contactlist = [person1, person2, person3];
    // $scope.contactlist = contactlist;
