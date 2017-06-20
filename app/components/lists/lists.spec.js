describe('listApp', function() {
  beforeEach(module('myApp'));
  beforeEach(module('ngStorage'));

  var scope,
  $http, 
  $componentController,
  $localStorage,
  $httpBackend;

  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
  }));

  beforeEach(inject(function($localStorage) {
    $localStorage = $localStorage;
  }));

  beforeEach(inject(function(_$http_) {
    $http = _$http_;
  }));

  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(inject(function($rootScope, $compile, $componentController, $httpBackend) {
    scope = $rootScope.$new();
    controller = $componentController('listApp', {scope, $http, $localStorage});
    scope.$digest();
    $httpBackend.whenGET("assets/JSON/lists.json").respond({ lists: 'World' });
    $componentController.lists = [ 
      {"title":"Hygiene Products", 
      "isNew":false,
      "listItems": [
        {"title": "Soap", 
        "description": "Kind that smells good.",
        "isSelected": false, 
        "completed": false}]},
      {"title": "School Supplies",
      "isNew":false,
      "listItems": [
        {"title": "Computer", 
        "description": "Laptop",
        "isSelected": false, 
        "completed": false},
        {"title": "Notebooks", 
        "description": "Just in case you take notes by hand.",
        "isSelected": true, 
        "completed": false}]}
    ]
  }));

  it('should create a new(3rd) list when addList() is called', function() {
    controller.addList("List Title");
    expect(controller.lists.length).toEqual(3);
  });

  it('should do the math of 2+2', function() {
    expect(2+2).toEqual(4);
  });

});