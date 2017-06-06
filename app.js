(function() { var app = angular.module("myApp",[ ]);	    

	app.controller("ListSetController", ['$http', function($http) {
		var self = this;
		$http.get('lists.json').then(function(res){
      		self.lists = res.data;                
    		}
    	);

		this.addListItem = function(newItem, list) {
			console.log(self);
			console.log(newItem);
			console.log(list);
			list.listItems.push(newItem);
		};

		this.addList = function(title) {
			console.log(title);
			var newList = {title: title, listItems:[]};
			self.lists.push(newList);
			console.log(self.lists);
		}	
	}]);
})();
