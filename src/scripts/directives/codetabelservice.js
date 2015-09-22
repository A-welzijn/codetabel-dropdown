'use strict';
(function (module) {
  try {
    module = angular.module('digipolis.codetabelservice');
  } catch (e) {
    module = angular.module('digipolis.codetabelservice', []);
  }
  module.factory('digipolisCodetabelService', ['AppService', 'awelzijnHelperHttp', 'AppConfig', function (appService, helper, appConfig) {
        
        function _get(codeTabelApiRoute) {
            var options = {
                authenticate: true,
                transform: function(response) {
                    var elements = [];

                    for (var key in response) {
                        if (key.indexOf('listOf', 0) === 0)
                        {
                            elements = response[key];
                            break;
                        }
                    }

                    return elements;
                }
            };

            return helper.get(appConfig.apiRoot + codeTabelApiRoute + '/', options);
        }

        appService.logger.creation('digipolisCodetabelService');

        return {
            get: _get
        };
    }]);
})();