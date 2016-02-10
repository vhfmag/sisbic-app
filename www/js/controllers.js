angular.module('app.controllers', [])

.filter('starred', function() {
  return function(data) {
    var filtered = [];
    angular.forEach(data, function(item) {
      if (item.starred) filtered.push(item);
    });
    return filtered;
  }
})

.filter('scheduled', function() {
  return function(data) {
    var filtered = [];
    angular.forEach(data, function(item) {
      if (item.scheduled) filtered.push(item);
    });
    return filtered;
  }
})

.controller('listaSisbic', function($scope, $rootScope, $ionicModal) {
  $scope.epochString  = function(epoch) {
    var hora = Math.floor(epoch / 3600), minuto = Math.floor((epoch % 3600) / 60);
    return (hora < 10 ? "0" + hora : hora) + ":" + (minuto < 10 ? "0" + minuto : minuto);
  };

  $rootScope.$watch(
    function() {
      return $rootScope.sisbicData;
    }, function(n, o) {
      var objToArr = function(obj) {
        return Object.keys(obj).map(function(a){return obj[a]});
      }

      if ($rootScope.sisbicData) {
        $scope.sisbicData = objToArr($rootScope.sisbicData);
        $scope.$evalAsync(function() {
          $(".htmlContent div").readmore({
            moreLink: '<a href="#">Ler mais</a>',
            lessLink: '<a href="#">Fechar</a>'
          });
        });
      }
    }, true);

    $scope.currentDate = new Date();
    $scope.minDate     = new Date();
    $scope.datePickerCallback = function (val) {
    	if (!val) {
    		console.log('Date not selected');
    	} else {
    		console.log('Selected date is : ', val);
    	}
    };

    var adjustTime = function() {
      var agora = new Date();
      var hora = agora.getHours();
      var minuto = agora.getMinutes();
      var total = 15 * (Math.floor(minuto/15) + 1);

      minuto = total % 60;
      hora  += Math.floor(total / 60);

      return (hora * 60 + minuto) * 60;
    }

    $scope.timePickerObject = {
      inputEpochTime: adjustTime(),
      titleLabel: 'Horário',  //Optional
      setLabel: 'Escolher',  //Optional
      closeLabel: 'Fechar',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
      callback: function (val) {    //Mandatory
        if (typeof (val) === 'undefined') {
          console.log('Time not selected');
        } else {
          var selectedTime = new Date(val * 1000);
          console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
        }
      }
    };

    $ionicModal.fromTemplateUrl('templates/agendarModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {

      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
})

.controller('configuraçõEsCtrl', function($scope) {

})
