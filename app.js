(function() { var app = angular.module("myApp",[ ]);
	var sampleLists   =	[{ 
							title: "Hygene Products",
							listItems: [{title: "Soap", description: "Kind that smells good."},
									{title: "Shaving cream", description: "Sensitive Skin"}],
						},
						{
							title: "School Supplies",
							listItems: [{title: "Computer", description: "Laptop"},
										{title: "Notebooks", description: "Just in case you take notes by hand."}]
						}];	
	    

	app.controller("ListController", function() {
		this.lists = sampleLists;
	});

	app.controller("ListSetController", function() {

	});
})();
