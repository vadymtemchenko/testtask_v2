'use strict';

angular.module('addressBook')
	.controller('MainCtrl', ['$scope', 'Backend', function($scope, Backend) {

			/**
			 * load data initial data from localStorage or from server
			 */
			$scope.init = function() {
				var self = this,
					ab = localStorage.addressBook;

				if(typeof ab === 'undefined') {
					Backend.loadRecords().then(function(rez) {
						if(rez.data) {
							localStorage.addressBook = JSON.stringify(rez.data);
							self.data = rez.data;
						}
					});
				} else {
					$scope.data = JSON.parse(ab);
				}
			};

			/**
			 * save changed/add new data to localStorage and send it tot server
			 */
			$scope.updateRecord = function(index) {
				if(typeof index === 'undefined') {
					index = $scope.data.length;
					$scope.data[index] = $scope.newRecord;
					$scope.newRecord = {};
				}
				Backend.updateRecord(index, $scope.data[index]);
			};

			/**
			 * delete data from localStorage and send it tot server
			 */
			$scope.deleteRecord = function(index) {
				if(typeof index === 'undefined') {
					return;
				}
				$scope.data.splice(index, 1);
				Backend.deleteRecord(index);
			};

			$scope.filters = {
				name: '',
				phone: '',
				address: ''
			};

			$scope.init();
		}]);
