'use strict';

angular.module('addressBook')
	.service('Backend', ['$http',
		function($http) {
			this.url = '';

			this.loadRecords = function() {
				return $http({
					method: 'GET',
					url: 'data/data.json'
				});
			};

			this.updateRecord = function(index, data) {
				//emulate working with database
				var ab = JSON.parse(localStorage.addressBook);
				delete data.id;
				delete data.$$hashKey;
				ab[index] = data;
				localStorage.addressBook = JSON.stringify(ab);

				return $http({
					method: 'POST',
					data: {
						id: index,
						data: data
					},
					url: this.url
				});
			};

			this.deleteRecord = function(index) {
				//emulate working with database
				var ab = JSON.parse(localStorage.addressBook);
				ab.splice(index, 1);
				localStorage.addressBook = JSON.stringify(ab);

				return $http({
					method: 'POST',
					data: {
						id: index
					},
					url: this.url
				});
			};
		}
	]);