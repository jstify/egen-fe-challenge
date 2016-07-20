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

"use strict"

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
