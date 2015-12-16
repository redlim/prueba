'use strict';
/**
 *
 *
 */
angular.module('cycleItCustomerServiceApp')
  .controller('IssuesCtrl', function ($scope, Ref, $firebaseArray, $timeout) {

    // sincronización de las issues
    $scope.issues = $firebaseArray(Ref.child('issues'));

    //el formulario de edición se mantiene oculto
    hideForm();

    $scope.currentIssue = {};
    // display any errors
    $scope.issues.$loaded().catch(alert);

    //no se edita al principio;
    disabledEdit();

    $scope.changeState = function(){
      $scope.showNewHistory = true;
    };
    $scope.issueDetails = function(issue){
      showForm();
      startOptions();
      $scope.currentIssue = issue;
      $scope.detailsLevel.selectedOption = {id:  $scope.currentIssue.level};
      $scope.detailsState.selectedOption = {id: $scope.currentIssue.state}
    };


    $scope.newIssue = function (){
      $scope.currentIssue = {};
      showForm();
      enableEdit();
      startOptions();

    };

    $scope.save = function(currentIssue){

      if(currentIssue.histories == undefined ){
        currentIssue.histories =[];
      }

      var d = new Date();
      currentIssue.date = d.toLocaleDateString();
      console.log(currentIssue.state);
      var history = currentIssue.state.name +": "+ $scope.newHistory +". Actualizado en "+ currentIssue.date;
      currentIssue.histories.push(history);

      $scope.issues.$add(currentIssue);
      $scope.issues.$remove(currentIssue);
      disabledEdit();
    };

    $scope.deleteClick = function(issue){
      $scope.issues.$remove(issue);
      hideForm();
    };
    $scope.editClick = function(){
      enableEdit();
    };

    $scope.cancelClick = function(){
      disabledEdit();
    };
    function startOptions(){
      //estado de la incidencia: abierta, resolviéndose, se necesita
      $scope.detailsLevel = {
        availableOptions: [
          {id: '1', name: 'Bajo'},
          {id: '2', name: 'Medio'},
          {id: '3', name: 'Alto'},
          {id: '4', name: 'Crítico'}
        ]
      };
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
        ]
      };
    }
    function showForm(){
      $scope.showNewHistory = false;
      $scope.showFormDetails = true;
      $scope.edit = false;
    }

    function hideForm(){
      $scope.showFormDetails = false;
      $scope.edit = false;
    }

    function enableEdit(){
      $scope.edit = true;
    }

    function disabledEdit(){
      $scope.newHistory = "";
      $scope.showNewHistory = false;
      $scope.edit = false;
    }

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
