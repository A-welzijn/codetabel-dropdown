'use strict';
(function (module) {
    try {
        module = angular.module('digipolis.codetabeldropdown');
    } catch (e) {
        module = angular.module('digipolis.codetabeldropdown', ['digipolis.codetabeldropdown']);
    }

module.directive('digipolisCodetabelDropdown', ['digipolisCodetabelService', '$timeout', function (codetabelService, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            transclude: false,
            scope: {
                editMode: '=',
                ngModel: '=',
                valueLabel: '=',
                ngChange: '&'
            },
            template: '<div>' +
                         '  <select ng-model="selectedkeyValue" class="form-control" ng-show="editMode" ng-change="OnChange()" ng-options="codetabelItem.omschrijving for codetabelItem in codetabelItems track by codetabelItem.id" /></select>' +
						 '  <div ng-if="valueLabel" ng-show="!editMode">{{valueLabel.trim() || "-"}}</div>' +
				      '</div>',
            link: function (scope, element, attrs) {

                scope.$watch('selectedkeyValue', function (newValue, oldValue) {

                    if (newValue !== oldValue) {
                        scope.ngModel = newValue.id;
                        scope.valueLabel = newValue.omschrijving;
                    }
                }, true);

                scope.$watch('ngModel', function () {
                    updateModel();
                });


                scope.OnChange = function () {
                    if (scope.ngChange) {
                        $timeout(function () {
                            scope.$apply(scope.ngChange());
                        }, 0, false);
                    }
                };

                codetabelService.get(attrs.codetablename).then(function (response) {
                    scope.codetabelItems = response;
                    scope.selectedkeyValue = null;
                    scope.valueLabel = '';
                    
                    updateModel();
                });

                function updateModel() {
                    if (scope.ngModel > 0) {
                        
                        angular.forEach(scope.codetabelItems, function (keyValue) {
                            if (keyValue.id === scope.ngModel) {
                                scope.selectedkeyValue = keyValue;
                                scope.valueLabel = keyValue.omschrijving;
                            }
                        });
                    }
                }

            }
        };
    }]);
 
})();
;'use strict';
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
})();;