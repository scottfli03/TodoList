(function() { var app = angular.module("myApp",[ ]);
	var sampleLists   =	[{  
							id: 1,
							title: "Hygene Products",
							listItems: [{id: 1, title: "Soap", description: "Kind that smells good.", completed: false},
										{id: 2, title: "Comb", description: "A giant one!", completed: false},
										{id: 3, title: "Shaving cream", description: "Sensitive Skin", completed: false}],
						},
						{
							id: 2,
							title: "School Supplies",
							listItems: [{id: 2, title: "Computer", description: "Laptop", completed: false},
										{id: 1, title: "Notebooks", description: "Just in case you take notes by hand.", completed: false}]
						}];	
	    

	app.controller("ListSetController", function() {
		this.lists = sampleLists;

		this.addList = function(list) {
			this.lists.push(list);
		};

		this.addListItem = function(listID, item) {
			var maxID = 1,
				i;
			for (i = 0; i < this.lists[listID].length; i++) {
				if (this.lists[listID].listItems[i].id > maxID) {
					maxID = this.lists[listID].listItems[i].id;
				}
			}
			item.id = maxID;
			item.completed = false;
			this.lists[listID].listItems.push(item);

		}	
	});
})();
