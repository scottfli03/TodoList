angular.module("myApp").component('tabSet', {
  controller: 'tabSetCtrl',
  templateUrl: 'templates/tabSet.html',
  transclude: true
});

angular.module("myApp").controller('tabSetCtrl', function($scope, $element, $attrs) {
  console.log("Entered tabSet controller.");
  var self = this;
  self.tabs = [];
  console.log(self);
  self.addTab = function(tab) {
    console.log("called tabSet.addTab");
    self.tabs.push(tab);
    if (self.tabs.length === 1) {
      self.selectTab(tab);
    }
  }
  self.selectTab = function(tab) {
    console.log("called tabSet.selectTab");
    angular.forEach(self.tabs, function(tab) {
      tab.active = false;
    });
    tab.active = true;
  }
});

angular.module("myApp").component('tabPane', {
  templateUrl: 'templates/tab.html',
  transclude: true,
  controller: function($scope, $element, $attrs) {
    console.log("Entered tab controller.");

    var self = this;
    self.$onInit = function() {
      console.log("OnInit entered.")
      self.$OnInit = self.tabSet.addTab(this);
    };
  },
  bindings: {
    header: '@'
  },
  require: {
    tabSet: '^tabSet'
  }
});