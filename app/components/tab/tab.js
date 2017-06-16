angular.module("myApp").component('tabSet', {
  controller: 'tabSetCtrl',
  templateUrl: 'app/components/tab/tabSet.html',
  transclude: true
});

angular.module("myApp").controller('tabSetCtrl', function($scope, $element, $attrs) {
  console.log("Entered tabSet controller.");
  var self = this;
  self.tabs = [];
  self.addTab = function(tab) {
    self.tabs.push(tab);
    if (self.tabs.length === 1) {
      self.selectTab(tab);
    }
  }
  self.selectTab = function(tab) {
    angular.forEach(self.tabs, function(tab) {
      tab.active = false;
    });
    tab.active = true;
  }
});

angular.module("myApp").component('tabPane', {
  templateUrl: 'app/components/tab/tab.html',
  transclude: true,
  controller: function($scope, $element, $attrs) {

    var self = this;
    self.$onInit = function() {
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