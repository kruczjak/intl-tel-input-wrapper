# Simple wrapper for intl-tel-input
##### https://github.com/jackocnr/intl-tel-input
-------------------

Examples:
```js
var wrapper = new IntlTelInputWrapper('#msisdn_field').init({
  preferredCountries: ['no', 'se'],
  dropdownContainer: 'body',
  initialCountry: 'pl'
});

//or use field selected earlier with jQuery
var field = $('#msisdn_field');
new IntlTelInputWrapper().initWithJQuery(field);

//change country
wrapper.changeCountry('no');
wrapper.changeCountry('47');

//check validity
wrapper.isValid(); // -> true/false

//get full number
wrapper.fullNumber(); // -> '+47xxxxxxxx'
wrapper.fullNumber(true); // -> '47xxxxxxxx'

//get field
wrapper.getField();

//onChange validations classes and callbacks
new IntlTelInputWrapper('#msisdn_field').init({
  errorValidationAddClass: 'error-class', //adds 'error-class' to '#msisdn_field'
  successValidationAddClass: 'success-class', //adds 'success-class' to '#msisdn_field'
  errorValidationCallback: function(e, this_object) {}, //calls function when validation error
  successValidationCallback: function(e, this_object) {} //calls function when validation success
});
```
