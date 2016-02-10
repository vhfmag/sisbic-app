angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ionic-datepicker', 'ionic-timepicker'])

.run(['$ionicPlatform', 'sisbicUtil', '$rootScope', function($ionicPlatform, sisbicUtil, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // use this to simulate no entries
    // window.localStorage.clear();
    sisbicUtil.getNews();
    $rootScope.$watch(function() {
      return $rootScope.sisbicData;
    }, function(o, n) {
      window.localStorage['sisbicData'] = JSON.stringify($rootScope.sisbicData);
    }, true);
  });
}])
