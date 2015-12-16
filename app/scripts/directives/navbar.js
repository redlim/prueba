
/**
 * @ngdoc function
 * @name cycleItCustomerServiceApp.directive:ngHideAuth
 * @description
 * # ngHideAuthDirective
 * A directive that shows elements only when user is logged out. It also waits for Auth
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module('cycleItCustomerServiceApp')
  .directive('wiNavbar', [function () {
    'use strict';
    var navbarController = function (){
      this.active = 1;

      this.set = function(id){
        this.active = id;
      };

      this.isSet = function(id){
        return this.active === id
      }

    };
    return {
      restrict: 'EA',
      controller : navbarController,
      controllerAs: 'navbarCtrl',
      templateUrl: 'views/navbar.html'
    };
  }]);
