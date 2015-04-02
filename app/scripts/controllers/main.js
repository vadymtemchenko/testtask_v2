'use strict';

angular.module('addressBook')
	.controller('MainCtrl', ['$scope', 'Backend', function($scope, Backend) {

			/**
			 * load data initial data from localStorage or from server
			 *
			 * @returns {undefined}
			 */
			$scope.init = function() {
				var self = this,
					ab = localStorage.addressBook;

				if(typeof ab === 'undefined') {
					Backend.loadRecords().then(function(rez) {
						if(rez.data) {
							localStorage.addressBook = JSON.stringify(rez.data);
							self.data = rez.data;
							self.filterRecords();
						}
					});
				} else {
					$scope.data = JSON.parse(ab);
					$scope.filterRecords();
				}
			};

			/**
			 * applies filters to data
			 *
			 * @returns {undefined}
			 */
			$scope.filterRecords = function() {
				var filters = $scope.filters,
					filtered;

				filtered = $scope.data.map(function(record, id) {
					record.id = id;
					return record;
				});
				Object.keys(filters).forEach(function(f) {
					if(!!filters[f]) {
						filtered = filtered.filter(function(record) {
							return record[f].indexOf(filters[f]) > -1;
						});
					}
				});
				$scope.filtered = filtered;
			};

			/**
			 * save changed/add new data to localStorage and send it tot server
			 *
			 * @returns {undefined}
			 */
			$scope.updateRecord = function(index) {
				var data;

				if(typeof index === 'undefined') {
					index = $scope.data.length;
					data = $scope.newRecord;
					$scope.newRecord = {};
				} else {
					data = $scope.filtered[index];
				}
				$scope.data[index] = data;
				Backend.updateRecord(index, data);
				$scope.filterRecords();
			};

			/**
			 * delete data from localStorage and send it tot server
			 *
			 * @returns {undefined}
			 */
			$scope.deleteRecord = function(index) {
				if(typeof index === 'undefined') {
					return;
				}
				$scope.data.splice(index, 1);
				Backend.deleteRecord(index);
				$scope.filterRecords();
			};

			$scope.filters = {
				name: '',
				phone: '',
				address: ''
			};

			$scope.init();
		}]);
