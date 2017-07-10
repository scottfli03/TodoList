angular.module("tabMod",[]).component('tabSet', {
  controller: 'tabSetCtrl',
  templateUrl: 'tabSet.html',
  transclude: true
});

angular.module("tabMod").controller('tabSetCtrl', ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
  console.log("Entered tabSet controller.");
  var self = this;
  self.tabs = [];
  self.addTab = function(tab) {
    self.tabs.push(tab);
    if (self.tabs.length === 1) {
      self.selectTab(tab);
    }
  };
  self.selectTab = function(tab) {
    angular.forEach(self.tabs, function(tab) {
      tab.active = false;
    });
    tab.active = true;
  };
}]);

angular.module("tabMod").component('tabPane', {
  templateUrl: 'tab.html',
  transclude: true,
  controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
    console.log("Entered tab controller");
    var self = this;
    self.$onInit = function() {
      self.$OnInit = self.tabSet.addTab(this);
    };
  }],
  bindings: {
    header: '@'
  },
  require: {
    tabSet: '^tabSet'
  }
});