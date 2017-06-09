angular.module("myApp").component('listApp', {
	templateUrl: 'templates/listApp.html',
	controller: function($http) {
		self = this;
		console.log("Entered List App Controller");
		self.$onInit = $http.get('JSON/lists.json').then(function(res){
			console.log("Attempting to access data.");
  		self.lists = res.data;  
			console.log(self.lists);              
		});
		
  	self.addList = function(title) {
			console.log("Attempting to add a new list");
  		self.lists.push({title: title,
  			itemsList: []
  		})
  	};
  	self.addListItem = function(list, title, description) {
			console.log("Attempting to add a list item");
			list.listItems.push({title: title, description: description, completed: false});

		};
		self.updateLists = function(event) {
			console.log("updateLists called.");
			self.lists = event.lists;
		};
  }
});

//Views
angular.module("myApp").component('listTables', {
	bindings: {
		lists: '<',
		list: '<',
		addListItem: '&',
		onListUpdate: '&'
	},
	templateUrl: 'templates/listTables.html',
	controller: function() {
		self = this;
		console.log("Entered ListTables Controller");
		self.updateList = function(event) {
			self.list = event.list;
		}
		self.$onChanges = function(changes) {
			console.log("Entered listTables on change method.");
			if (changes.list) {
				console.log("changes.list === true");
				self.list = angular.copy(changes.list.currentValue);
			}
		};
		self.saveList = function() {
			self.onListUpdate({
				$event: {
					list: self.list
				}
			});
		};
	}
});

angular.module("myApp").component('addListItemTable', {
	bindings: {
		addListItem: '&',
		list: '<',
		onListUpdate: '&'
	},
	templateUrl: 'templates/addListItemTable.html',
	controller: function() {
		self = this;
		console.log("Entered addListItemTable Controller");
		self.$onChanges = function(changes) {
			if(changes.list){
				self.list = angular.copy(changes.list.currentValue);
			}
		};
		self.saveList = function() {
			self.onListUpdate({
				$event: {
					list: self.list
				}
			})
		};
	}
});

angular.module("myApp").component('newListForm', {
	bindings: {
		addList: '&',
		lists: '<',
		onListsUpdate: '&'
	},
	templateUrl: 'templates/newListForm.html',
	controller: function() {
		self = this;
		console.log("Entered newListForm Controller");
		self.$onChanges = function(changes) {
			if (changes.lists && self.lists !== undefined) {
				self.lists = angular.copy(self.lists.currentValue);
			}
		}
		self.saveLists = function() {
			self.onListsUpdate({
				$event: {
					lists: self.lists
				}
			})
		};
	}
});





