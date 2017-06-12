angular.module("myApp").component('listApp', {
	controller: function($http) {
		var self = this;
		console.log("Entered List App Controller");
		self.$onInit = $http.get('JSON/lists.json').then(function(res){
			console.log("Attempting to access data.");
  		self.lists = res.data;  
			console.log(self.lists);              
		});
  	self.addList = function(title) {
			console.log("Attempting to add a new list to:\n" + self.lists);
  		self.lists.push({title: title,
  			listItems: [],
  		});
  		console.log("After adding your list:\n" + self.lists);
  	};
  	self.addListItem = function(list, newItem) {
			console.log("addListItem called");
			var newItemCopy = angular.copy(newItem);
			console.log(self);
			list.listItems.push(newItemCopy);
			console.log(self.lists);
		};
  },
	templateUrl: 'templates/listApp.html'
});

//Views
angular.module("myApp").component('listTables', {
	bindings: {
		list: '<',
		addListItem: '&'
	},
	templateUrl: 'templates/listTables.html',
	controller: function() {
		var self = this;

		console.log("Entered ListTables Controller");
		console.log(self);
	}
});

angular.module("myApp").component('addListItemTable', {
	bindings: {
		addListItem: '&',
		list: '<'
	},
	templateUrl: 'templates/addListItemTable.html',
	controller: function() {
		var self = this;
		console.log("Entered addListItemTable Controller");
		console.log(self);
	}
});

angular.module("myApp").component('newListForm', {
	bindings: {
		addList: '&'
	},
	templateUrl: 'templates/newListForm.html',
	controller: function() {
		self = this;
		console.log("Entered newListForm Controller");
		console.log(self);
	}
});





