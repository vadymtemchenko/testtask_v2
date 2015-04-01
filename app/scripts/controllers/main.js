'use strict';

angular.module('addressBook')
	.controller('MainCtrl', ['$scope','Backend', function ($scope, Backend) {

		$scope.init = function (){
			var self = this,
				ab = localStorage.addressBook;
			
			if(typeof ab === 'undefined'){
				Backend.loadRecords().then(function(rez){
					if(rez.data){
						localStorage.addressBook = JSON.stringify(rez.data);
						self.data = rez.data;
						self.filterRecords();
					}
				});
			} else {
				self.data = JSON.parse(ab);
				self.filterRecords();
			}			
		};
			
		$scope.filterRecords = function (){
			var filters = $scope.filters,
				filtered;
			
			filtered = $scope.data.map(function (record ,id){
				record.id = id;
				return record;
			});
			Object.keys(filters).forEach(function(f){
				if(!!filters[f]){
					filtered = filtered.filter(function(record){
						return record[f].indexOf(filters[f]) > -1; 
					});
				}
			});
			$scope.filtered = filtered;
		};
		
		$scope.updateRecord = function (index){
			var index,
				data; 
			
			if(typeof index === "undefined"){
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
		
		$scope.deleteRecord = function (index){
			var index;
			
			if(typeof index === "undefined"){
				return;
			} else {
				$scope.data.splice(index, 1);
			}
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
