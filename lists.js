function ListSetController($scope, $element, $attrs, $http) {
	var self = this; 
	$http.get('JSON/lists.json').then(function(res){
    		self.lists = res.data;                
  	}
  );

	self.addListItem = function(newItem, list) {
		console.log(list);
		var copyOfItem = {title: newItem.title,
			description: newItem.description};
		list.listItems.push(copyOfItem);
		console.log(list);
	};

	this.addList = function(title) {
		var newList = {title: title, listItems:[]};
		self.lists.push(newList);
	};
}

angular.module("myApp").component('listSet', {
	bindings: {
		lists: '&',
		list: '&',
		listItems: '&'
	},
	templateUrl: 'templates/listSet.html',
	controller: ListSetController
});

angular.module("myApp").component('addListItemTable', {
	bindings: {
		lists: '&',
		list: '&',
		listItems: '&'
	},
	controller: ListSetController, 
	templateUrl: 'templates/addListItemTable.html'
});

angular.module("myApp").component('listTables', {
	bindings: {
		lists: '&',
		list: '&',
		listItems: '&'
	},
	controller: ListSetController,
	templateUrl: 'templates/listTables.html'
});

angular.module("myApp").component('newListForm', {
	bindings: {
		lists: '&',
		list: '&',
		listItems: '&'
	},
	controller: ListSetController,
	templateUrl: 'templates/newListForm.html'
});





