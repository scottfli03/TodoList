(function() { var app = angular.module("myApp",[ ]);	    

	app.controller("ListSetController", ['$http', function($http) {
		var self = this;
		var newItem = {};
		self.newItem = newItem;
		try {
			$http.get('lists.json').then(function(res){
          		self.lists = res.data;                
        		}
        	);
		} 
		catch(err) {
			console.log(err);
		}

		this.addListItem = function(list) {
			console.log(list);
			self.newItem.completed = false;
			list.listItems.push(self.newItem);
		};	
	}]);
})();
