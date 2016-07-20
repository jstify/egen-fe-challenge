/**
 * @ngdoc module ccField
 * @ngdoc value ccFieldSupportingCards
 * @ngdoc overview This value has default supported card types by ccField directive.
 */

"use strict"

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