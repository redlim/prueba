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

    // display any errors
    $scope.issues.$loaded().catch(alert);

    // Método para añadir alguna incidencia
    $scope.addIssue = function(newIssue) {
      if( newIssue ) {
        // push a message to the end of the array
        $scope.messages.$add(newIssue)
          // display any errors
          .catch(alert);
      }
    };

    //editarIncidencia:
    $scope.issueDetails = function(issue){
      $scope.showFormDetails = true;
      $scope.detailsName = issue.issueProject;
      $scope.detailsDescription = issue.description;
      $scope.detailsSummary = issue.summary;
      $scope.detailsLevel = {
        availableOptions: [
          {id: '1', name: 'Bajo'},
          {id: '2', name: 'Medio'},
          {id: '3', name: 'Alto'},
          {id: '4', name: 'Crítico'}
        ],
        selectedOption: {id: issue.level}
      };
      $scope.detailsHistories = issue.history;
      //estado de la incidencia: abierta, resolviéndose, se necesita
      //feedback, cerrada, resuelta, duplicada o no se resuelve
      $scope.detailsState =  {
        availableOptions: [
          {id: '1', name: 'Abierta'},
          {id: '2', name: 'Resolviéndose'},
          {id: '3', name: 'Se necesita feedback'},
          {id: '4', name: 'Cerrada'},
          {id: '4', name: 'Resuelta'},
          {id: '4', name: 'Duplicada'},
          {id: '4', name: 'No se resuelve'}
        ],
        selectedOption: {id:issue.state}
      };

    };

    //$scope.i

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
