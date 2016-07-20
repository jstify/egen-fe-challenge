/**
 * @ngdoc module ccField
 * @ngdoc overview ccField Module
 */



angular.module("ccField", []);
angular.module('ccField').run(['$templateCache', function($templateCache) {$templateCache.put('ext-modules/ccField/ccFieldTemplate.html','<div class="ccfield ccfield-area">\r\n    <div class="label">\r\n        <span class="text">{{fieldData.label}}</span>\r\n        <span class="required" ng-if="configData.required">*</span>\r\n    </div>\r\n    <div class="input-area" tab-index="1">\r\n        <div class="logo floatL" style="background-image:url(\'{{fieldData.logo}}\')" ng-if="!configData.hideLogo"> </div>\r\n        <div class="inpt-wpr">\r\n            <input type="number" name="{{name}}" class="inpt-fld" ng-model="fieldData.cardNumber" ng-required="configData.required"/>\r\n        </div>\r\n    </div>\r\n</div>\r\n');}]);
/**
 * @ngdoc module ccField
 * @ngdoc value ccFieldSupportingCards
 * @ngdoc overview This value has default supported card types by ccField directive.
 */



angular.module("ccField")
.value("ccFieldSupportingCards", [
    {
        title: "Visa Card",
        type: "visa",
        logo: "assets/img/visaCard.png",
        pattern: /^4/,
        format: ''
    },{
        title: "Master Card",
        type: "master",
        logo: "assets/img/masterCard.png",
        pattern: /^5[1-5]/,
        format: ''
    },{
        title: "American Express Card",
        type: "amex",
        logo: "assets/img/amexCard.png",
        pattern: /^(34)|^(37)/,
        format: ''
    },{
        title: "Maestro Card",
        type: "maestro",
        logo: "assets/img/maestroCard.png",
        pattern: /^(5018)|^(5020)|^(5038)|^(5893)|^(6304)|^(6759)|^(6761)|^(6762)|^(6763)|^(0604)/,
        format: ''
    },{
        title: "Discover Card",
        type: "discover",
        logo: "assets/img/discoverCard.png",
        pattern: /^(6011)|^(622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5])))|^(64[4-9])|^65/,
        format: ''
    }
]);
/**
 * @ngdoc module ccField
 * @ngdoc service ccFieldService
 * @ngdoc overview This service handles the supporting card details.
    We can add new cards to list or we set new set of cards to list. 
    The directive updates thefield details based on the cards in the list.
    The card details should have following details
    {
        title: "Visa Card", //Card Name
        type: "visa", //Card type same as name (but unique key for reference purpose)
        logo: "assets/img/visaCard.png", //Card logo url
        pattern: /^4/, //Card number match pattern, to determine type of the card
        format: '' //Pattern to format the card number
    }
 * @required ccFieldSupportingCards
 */



angular.module("ccField")
.service("ccFieldService", [
    "ccFieldSupportingCards",
    function (ccFieldSupportingCards) {
        var that = this;
        var defaultImageUrl = "assets/img/defaultCard.png";
        var suportCards = angular.copy(ccFieldSupportingCards);

        /**
         * @name setDefaultImageUrl
         * @description This function updates the default logo url, which will shown when card number is not matched with list of cards.
         * @param {String | Url} url Default logo url
         */
        that.setDefaultImageUrl = function(url) {
            defaultImageUrl = url || defaultImageUrl;
        }


        /**
         * @name getDefaultImageUrl
         * @description This function retrives the default logo url.
         * @return {String | Url} Default logo url
         */
        that.getDefaultImageUrl = function() {
            return defaultImageUrl;
        }


        /**
         * @name setSupportedCards
         * @description This function replces the list of supporting cards with new list of supporting cards.
         * @param {Array} items New supporting cards set
         */
        that.setSupportedCards = function(items) {
            suportCards = angular.copy(items);
        }

        /**
         * @name addToSupportedCards
         * @description This function appends new cards to default supporting card(s).
         * @param {Array | Object} items New supporting card(s)
         */
        that.addToSupportedCards = function(items) {
            suportCards = suportCards.concat(items);
        }


        /**
         * @name getSupportedCards
         * @description This function gives supporting cards list.
         * @return {Array}  Supporting cards list
         */
        that.getSupportedCards = function() {
            return angular.copy(suportCards);
        }


        /**
         * @name getCardDetailsByPattern
         * @description This function compars the card number against the card pattern and returns the matched card details from supporting cards.
         * @param {Number} ccnumber Card number entered by user
         * @return {Object | Undefined}  Matched card details
         */
        that.getCardDetailsByPattern = function(ccnumber) {
            return suportCards.find(function(card){
                return card.pattern.test(ccnumber)
            });
        }
    }
]);

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
                            console.log(cardDetails);
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