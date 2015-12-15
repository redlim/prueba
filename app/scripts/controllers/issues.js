'use strict';
/**
 * @ngdoc function
 * @name cycleItCustomerServiceApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('cycleItCustomerServiceApp')
  .controller('IssuesCtrl', function ($scope, Ref, $firebaseArray, $timeout) {
    //el formulario de edición se mantiene oculto
    $scope.showFormDetails = false;
    // sincronización de las issues
    $scope.issues = $firebaseArray(Ref.child('issues'));
    $scope.currentIssue = {};
    // display any errors
    $scope.issues.$loaded().catch(alert);
    //editarIncidencia:
    $scope.newHistory ="";
    $scope.showNewHistory = false;

    $scope.changeState = function(){
      console.log("hola");
      $scope.showNewHistory = true;
    };
    $scope.issueDetails = function(issue){
      $scope.showNewHistory = false;
      $scope.showFormDetails = true;
      $scope.currentIssue = issue;
      $scope.detailsLevel = {
        availableOptions: [
          {id: '1', name: 'Bajo'},
          {id: '2', name: 'Medio'},
          {id: '3', name: 'Alto'},
          {id: '4', name: 'Crítico'}
        ],
        selectedOption: {id:  $scope.currentIssue.level}
      };
      //estado de la incidencia: abierta, resolviéndose, se necesita
      //feedback, cerrada, resuelta, duplicada o no se resuelve
      $scope.detailsState =  {
        availableOptions: [
          {id: '1', name: 'Abierta'},
          {id: '2', name: 'Resolviéndose'},
          {id: '3', name: 'Se necesita feedback'},
          {id: '4', name: 'Cerrada'},
          {id: '5', name: 'Resuelta'},
          {id: '6', name: 'Duplicada'},
          {id: '7', name: 'No se resuelve'}
        ],
        selectedOption: {id: $scope.currentIssue.state}
      };
    };


    $scope.save = function(currentIssue){
      console.log(currentIssue.histories);
      if(currentIssue.histories == "undefined"){
        currentIssue.histories =[];
      }
      //console.log($scope.newHistory);
      currentIssue.histories.push($scope.newHistory);
      $scope.issues.$save(currentIssue);
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
