/**
 * @ngdoc module egenFeChallenge
 * @ngdoc config
 * @ngdoc overview Application name (Root Module)
 */

"use strict"

angular.module("egenFeChallenge")
.config([
    '$compileProvider', 
    function ($compileProvider) {
        //It will disabled adding and removing ng-scope classes to dom elements, 
        //so that the performance will increase 
        $compileProvider.debugInfoEnabled(false);
}]);