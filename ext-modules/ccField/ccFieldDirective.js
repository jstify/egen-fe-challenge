/**
 * @ngdoc module ccField
 * @ngdoc directive ccField
 * @ngdoc overview This directive renders the credit card field. It will update the logo of card based the number given by user. 
 * It foramats the card number if there are any specifications.
 * @required ccFieldService, 
    configData {
        label: "Card Number", // Title of the field
        required: true, // Required or not
        format: true, // Want to format number or not
        value: null, //Default card number
        hideLogo: true //To hide logo in field
    },
    name - Input filed name to support form validation
 *
 */

"use strict"

angular.module("ccField")
.directive("ccField", [
    "ccFieldService",
    function (ccFieldService) {
        return {
            restrict : 'AE',
            templateUrl: "ext-modules/ccField/ccFieldTemplate.html",
            scope: {
                "configData": "=",
                "name": "@"
            },
            link: function(scope, element, ctrl) {
                var configData = scope.configData || {};
                var defaultLogoUrl = ccFieldService.getDefaultImageUrl();

                //Setting default values
                scope.fieldData = {
                    logo: defaultLogoUrl,
                    label: configData.label,
                    cardNumber: configData.value
                };
                

                /**
                 * @name setDefaultLogoUrl
                 * @description This function sets the card logo to default card symbol.
                 */
                var setDefaultLogoUrl = function() {
                    if(!scope.fieldData) {
                        scope.fieldData = {};
                    }
                    scope.fieldData.logo = defaultLogoUrl;
                }


                /**
                 * @name updateConfigData
                 * @description This function updates the card number from scope to config data.
                 */
                var updateConfigData = function() {
                    scope.configData.value = scope.fieldData.cardNumber;
                }


                /**
                 * @name updateCCField
                 * @description This function gets the card details like type, logo, format pattern & etc from ccFieldService and updates the cc fieldData, so that it will update in UI.
                 */
                var updateCCField = function() {
                    var cardNumber = scope.fieldData.cardNumber;
                    updateConfigData();
                    if(cardNumber) {
                        var cardDetails = ccFieldService.getCardDetailsByPattern(cardNumber);
                        if(cardDetails) {
                            scope.fieldData.logo = cardDetails.logo;
                        } else {
                            setDefaultLogoUrl();
                        }
                        //TODO Format Number
                    } else {
                        setDefaultLogoUrl();
                    }
                }

                //Wach for the card number change and update the field data
                scope.$watch('fieldData.cardNumber', function (newValue, oldValue) {
                    if(newValue !== oldValue) {
                        updateCCField();
                    }
                });

                updateCCField();
            }
        }
    }
])