'use strict';

angular.module('addressBook').filter('filterAddress', [function() {
		return function(data, filters) {
			var filtered;
			data = data || [];

			filtered = data.map(function(record, id) {
				record.id = id;
				return record;
			});
			Object.keys(filters).forEach(function(f) {
				if(!!filters[f]) {
					filtered = filtered.filter(function(record) {
						return record[f].toLowerCase().indexOf(filters[f].toLowerCase()) > -1;
					});
				}
			});
			return filtered;
		};
	}]);