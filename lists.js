angular.module("myApp").component('listApp', {
	controller: function($http) {
		var self = this;
		console.log("Entered List App Controller");
		self.$onInit = $http.get('JSON/lists.json').then(function(res){
			console.log("Attempting to access data.");
  		self.lists = res.data;              
		});
  	self.addList = function(title) {
			console.log("Attempting to add a new list to:\n" + self.lists);
  		self.lists.push({title: title,
  			listItems: [],
  		});
  		console.log("After adding your list:\n" + self.lists);
  	};
  	self.removeList = function(list) {
  		var index = self.lists.indexOf(list);
  		self.lists.splice(index, 1);
  	};
  	self.addListItem = function(list, newItem) {
			console.log("addListItem called");
			newItem["isSelected"] = false;
			newItem["completed"] = false;
			var newItemCopy = angular.copy(newItem);
			list.listItems.push(newItemCopy);
		};
		self.updateListItem = function(list, listItem) {
			console.log("updateListItem called");
			var listIndex = self.lists.indexOf(list);
			var itemIndex = list.listItems.indexOf(listItem);
			var listItemCopy = angular.copy(listItem);
			self.lists[listIndex].listItems[itemIndex] = listItem;
		};
		self.removeListItem = function(list, listItem) {
			console.log("removeListItem called");
			var listIndex = self.lists.indexOf(list);
			var itemIndex = list.listItems.indexOf(listItem);
			self.lists[listIndex].listItems.splice(itemIndex, 1);
		};
		self.makeSelectedCompleted = function(list) {
			console.log("makeSelectedCompleted called");
			var liLength = list.listItems.length;
			var index = self.lists.indexOf(list);
			for (var i = 0; i < liLength; i++) {
				if (list.listItems[i].isSelected === true) {
					list.listItems[i].completed = true;
				} else {
					list.listItems[i].completed = false;
				}
			}
		}
  },
	templateUrl: 'templates/listApp.html'
});

//Views
angular.module("myApp").component('listTables', {
	bindings: {
		list: '<',
		addListItem: '&',
		removeList: '&',
		removeListItem: '&',
		updateListItem: '&',
		makeSelectedCompleted: '&'
	},
	templateUrl: 'templates/listTables.html',
	controller: function() {
		var self = this;
		console.log("Entered ListTables Controller");
	}
});

angular.module("myApp").component('listItemToolTable', {
	bindings: {
		addListItem: '&',
		makeSelectedCompleted: '&',
		list: '<'
	},
	templateUrl: 'templates/listItemToolTable.html',
	controller: function() {
		var self = this;
		console.log("Entered addListItemTable Controller");
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
	}
});





