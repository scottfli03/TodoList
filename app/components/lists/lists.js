angular.module("myApp",['ngStorage']).component('listApp', {
	controller: function($scope, $http, $localStorage) {
		var self = this;
		// delete $localStorage.lists;
		console.log("Entered List App Controller");
		if (typeof $localStorage.lists === "undefined") {
			self.$onInit = $http.get('assets/JSON/lists.json').then(function(res){
				console.log("Attempting to access data.");
	  		self.lists = res.data;
	  		self.saveListData();           
			});
		} else {
			self.lists = localStorage.lists;
		}
		function loadListData() {
			self.lists = $localStorage.lists;
		}
		self.saveListData = function() {
			$localStorage.lists = self.lists;
		}
  	self.addList = function(title) {
			console.log("Attempting to add a new list to:\n" + self.lists);
  		self.lists.push({title: title,
  			isNew: true,
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
			list.isNew = false;
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
			console.log(list);
			console.log(listItem);
			var listIndex = self.lists.indexOf(list);
			var itemIndex = list.listItems.indexOf(listItem);
			console.log(itemIndex);
			self.lists[listIndex].listItems.splice(itemIndex, 1);
		};
		self.toggleCompleted = function(listType, list) {
			console.log("setComplete called");
			var liLength = list.listItems.length;
			var index = self.lists.indexOf(list);
			var liIsSelected;
			for (var i = 0; i < liLength; i++) {
				liIsSelected = list.listItems[i].isSelected;
				if (liIsSelected === true && listType === 'incomplete') {
					list.listItems[i].completed = true;
				} else if (liIsSelected === true && listType === 'completed') {
					list.listItems[i].completed = false;
				}
			}
			self.setUnSelected();
			self.lists[index] = angular.copy(list);
		};
		self.setUnSelected = function() {
			var listsLength = self.lists.length;
			var i, a, theList, liLength;
			for (i = 0; i < listsLength; i++) {
				theList = self.lists[i];
				liLength = theList.listItems.length;
				for (a = 0; a < liLength; a++) {
					theList.listItems[a]["isSelected"] = false;
				}
			}
		};
		if (typeof $localStorage.lists !== "undefined") {
			loadListData();
		}
		console.log(self);
  },
	templateUrl: 'app/components/lists/listApp.html',
	bindings: {
		listType: '@'
	}
});

//Views
angular.module("myApp").component('listTables', {
	bindings: {
		list: '<',
		addListItem: '&',
		removeList: '&',
		removeListItem: '&',
		updateListItem: '&',
		toggleCompleted: '&',
		listType: '<'
	},
	templateUrl: 'app/components/lists/listTables.html',
	controller: function() {
		var self = this;
		console.log("Entered ListTables Controller");
	}
});

angular.module("myApp").component('listItemToolTable', {
	bindings: {
		addListItem: '&',
		toggleCompleted: '&',
		list: '<',
		listType: '<'
	},
	templateUrl: 'app/components/lists/listItemToolTable.html',
	controller: function() {
		var self = this;
		console.log("Entered addListItemTable Controller");
		var testIt = function(message) {
			console.log(message);
		}
	}
});

angular.module("myApp").component('newListForm', {
	bindings: {
		addList: '&'
	},
	templateUrl: 'app/components/lists/newListForm.html',
	controller: function() {
		self = this;
		console.log("Entered newListForm Controller");
	}
});





