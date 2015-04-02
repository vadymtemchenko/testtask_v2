'use strict';

/**
 * @ngdoc overview
 * @name addressBook
 * @description
 * # addressBook
 *
 * Main module of the application.
 */
angular
	.module('addressBook', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch'
	])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	});
