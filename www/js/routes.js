angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabsController.Last', {
      url: '/last',
      views: {
        'tab1': {
          templateUrl: 'templates/last.html',
          controller: 'listaSisbic'
        }
      }
    })

    .state('tabsController.Starred', {
      url: '/starred',
      views: {
        'tab2': {
          templateUrl: 'templates/starred.html',
          controller: 'listaSisbic'
        }
      }
    })

    .state('tabsController.Scheduled', {
      url: '/scheduled',
      views: {
        'tab3': {
          templateUrl: 'templates/scheduled.html',
          controller: 'listaSisbic'
        }
      }
    })

    .state('tabsController', {
      url: '/main',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })

    .state('configuraçõEs', {
      url: '/settings',
      templateUrl: 'templates/configuraçõEs.html',
      controller: 'configuraçõEsCtrl'
    })

    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main/last');
});
