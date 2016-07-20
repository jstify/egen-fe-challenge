/**
 * @ngdoc module egenFeChallenge
 * @ngdoc controller appController
 * @ngdoc overview Application root controller
 */

"use strict"

angular.module("egenFeChallenge")
.controller("appController", [
    "$scope",
    function($scope) {

        //Data model for ccField directive
        $scope.configData1 = {
            label: "Card Number",
            required: true,
            format: true,
            value: null
        }

        $scope.configData2 = {
            label: "Credit Card Number (Not Required)",
            required: false,
            format: true,
            value: null
        }

        $scope.configData3 = {
            label: "Bank Card Number (No Format)",
            required: true,
            format: false,
            value: 4545454545454545
        }

        $scope.configData4 = {
            label: "Bank Card Number (Hide Logo)",
            required: true,
            format: true,
            value: 5555545454545457,
            hideLogo: true
        }
    }
])