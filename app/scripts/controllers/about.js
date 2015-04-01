'use strict';

/**
 * @ngdoc function
 * @name address book.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the address book
 */
angular.module('address book')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
