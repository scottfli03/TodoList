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
  			itemsList: []
  		});
  		console.log("After adding your list:\n" + self.lists);
  	};
  	self.addListItem = function(obj) {
			console.log("addListItem called");
			console.log(this);
  		console.log(obj);
  		console.log(description);
			list.listItems.push({title: title, description: description, completed: false});
			console.log(self.lists);
		};
		// self.updateLists = function(event) {
		// 	console.log("updateLists called.");
		// 	self.lists = event.lists;
		// 	console.log(self.lists);
		// };
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
		// self.updateList = function(event) {
		// 	console.log("updateList called:\nself.list:\n"+self.list+"\nevent.list:\n" + event.list);
		// 	self.list = event.list;
		// };
		// self.$onChanges = function(changes) {
		// 	console.log("Entered listTables $onChange method.");
		// 	if (changes.list && self.list !== undefined) {
		// 		self.list = angular.copy(changes.list.currentValue);
		// 		console.log(self.list);
		// 	}
		// 	else {
		// 		console.log(self.list);
		// 	}
		// };
		// self.saveList = function() {
		// 	console.log("saveList called.")
		// 	self.onListUpdate({
		// 		$event: {
		// 			list: self.list
		// 		}
		// 	});
		// };
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
		self.newItem = {
			title : '',
			description : '',
			completed : false
		};
		console.log("Entered addListItemTable Controller");
		console.log(self);
		// self.$onChanges = function(changes) {
		// 	if(changes.list){
		// 		self.list = angular.copy(changes.list.currentValue);
		// 	}
		// };
		// self.saveList = function() {
		// 	self.onListUpdate({
		// 		$event: {
		// 			list: self.list
		// 		}
		// 	})
		// };
	}
});

angular.module("myApp").component('newListForm', {
	bindings: {
		addList: '&'
	},
	templateUrl: 'templates/newListForm.html',
	controller: function() {
		self = this;
		self.addList('testList');
		console.log("Entered newListForm Controller");
		console.log(self);
		// self.$onChanges = function(changes) {
		// 	console.log("newListForm $onChanges method called.");
		// 	if (changes.lists && self.lists !== undefined) {
		// 		self.lists = angular.copy(self.lists.currentValue);
		// 	}
		// };
		// self.saveLists = function() {
		// 	console.log("saveLists called.");
		// 	self.onListsUpdate({
		// 		$event: {
		// 			lists: self.lists
		// 		}
		// 	})
		// };
	}
});





