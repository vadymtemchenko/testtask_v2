'use strict';

/**
 * @ngdoc function
 * @name addressBookaddressBookcontroller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the addressBook
 */
angular.module('addressBook')
	.controller('AboutCtrl', function($scope) {
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	});
