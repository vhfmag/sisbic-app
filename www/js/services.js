angular.module('app.services', [])

.factory('sisbicUtil', ['$http', '$rootScope', '$interval', function($http, $rootScope, $interval) {
  var update = function() {
    console.log("updating bitcheeeees");
    $http.get("http://www.peteletrica.eng.ufba.br/vigo/sisbic/getSisbicNews.php").then(
      function(res) {
        var doc     = jQuery(res.data);
        var dates = doc.find("> tbody > tr > td:nth-child(1)").map(function(){return $(this).text();}).get();
        var news  = doc.find("> tbody > tr > td:nth-child(2)").map(function(){return $(this).html();}).get();

        if (dates.length !== news.length) throw "Bad sisbic :<.\nBad formatted response";
        if (!$rootScope.sisbicData) $rootScope.sisbicData = {};
        for (var i = 0; i < dates.length; i++) {
          var date = dates[i], new1 = news[i];
          var key = md5(new1);

          if (!$rootScope.sisbicData.hasOwnProperty(key)) {
            $rootScope.sisbicData[key] = {date:date, news:new1, starred: false, scheduled: ""};
          }
        }

        window.localStorage['sisbicData'] = JSON.stringify($rootScope.sisbicData);
      }, function (err) {console.log("aff sério");}
    );
  };

  return {
    getNews: function() {
      // use this to simulate no entries
      // return update;

      if (window.localStorage.hasOwnProperty('sisbicData') && window.localStorage.sisbicData !== 'undefined') {
        $rootScope.sisbicData = JSON.parse(window.localStorage.sisbicData);
      } else {
        update();
      }

      $interval(update, 30 * 60 * 1000);
      return update;
    }
  };
}]);
