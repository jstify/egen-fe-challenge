# Egen Frontend Angular challenge

An Angular component (directive or filter) that takes credit card number as the input and shows the credit card issuing network within the same input.

### Technologies used:
 - Bower
 - npm
 - Gulp (for automation)
 - Angular

##Implementation 
Developed a **ccField** directive, which renders credit card field with label and input. It is wrapped with **ccField** module, which has following components:

 - **ccFieldSupportingCards**: contains list of default supportd cards by directive (Currently, it supports Visa, Master, Maestro, Discover & Amex cards). The card model looks like as follows:
> `{
		title: "Visa Card", 								//Card Name
		type: "visa", 										//Card type same as name (but unique key for reference purpose)
		logo: "assets/img/visaCard.png", 		//Card logo url
		pattern: /^4/, 									//Card number match pattern, to determine type of the card
		format: '' 											//Pattern to format the card number
}`

 - **ccFieldService**: Using this service, new cards can be added to default supporting cards, or can update entire list with new list (but the list should have models as mentioned above).


##Usage

This directive can be integrated in any application by using following steps:

 - Load `ccField.js` and `ccField.css` in DOM
 - Add ccField module to your app dependency.
		`angular.module("egenFeChallenge", ["ccField"]);`
 -  Add directive wherever you want in the application.
		>`<cc-field config-data="configData" name="field1"></cc-field>`

	The directive requires following attribute data:
		**configData**: `{
	        label: "Card Number", // Title of the field
	        required: true, // Required or not
	        format: true, // Want to format number or not
	        value: null, //Default card number
	        hideLogo: true //To hide logo in field
	    }`
	    **name** - Input filed name to support form validation

##TODO

 - Card number formatting (Need to support custom formats xxx-xxxx-xx)
 - Restrict input filed length based on the card type
 - Validating card number

##References

 - https://en.wikipedia.org/wiki/Payment_card_number
 - https://creditcardjs.com/credit-card-type-detection
 - http://www.tamas.io/custom-angularjs-filter-to-determine-credit-card-type/ 
 - https://www.google.co.in/search?q=credit+card+logos&gws_rd=cr&ei=MZaQV5DKFImBvQSPz6HoDw
 - https://www.iconfinder.com/
