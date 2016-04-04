var IntlTelInputWrapper = window.IntlTelInputWrapper = function(fieldId, formId) {
  this.countryData = $.fn.intlTelInput.getCountryData();
  if (fieldId) this.field = $(fieldId);
  this.formId = formId;

  this.formCallback = function()  {
    var self = this;
    this.form = $(formId);

    this.form.submit(function() {
      self.field.val(self.field.intlTelInput("getNumber"));
    });
  };
};

IntlTelInputWrapper.prototype.init = function(settings)  {
  if (!!this.field || !this.field.length) return false;
  settings = settings || {};

  this.field.intlTelInput({
    preferredCountries: settings.preferredCountries || ['no', 'se', 'dk', 'fi', 'ee'],
    dropdownContainer: settings.dropdownContainer || '',
    initialCountry: settings.initialCountry || ''
  });

  if (this.field.val()[0] != '+' && settings.addCountryCode) {
    this.field.val('+' + this.field.intlTelInput("getSelectedCountryData").dialCode + this.field.val());
  }

  if (this.formId) this.formCallback();
};

IntlTelInputWrapper.prototype.initWithJQuery = function(field, settings) {
  this.field = field;
  this.init(settings);
};

IntlTelInputWrapper.prototype.changeCountry = function(countryString)  {
  if (!countryString) return;

  if (countryString[0] <= '9' && countryString[0] >= '0') {
    var country = $.grep(this.countryData, function (e) {
      return e.dialCode == countryString;
    })[0];
    if (typeof country === 'undefined') return;
    countryString = country.iso2;
  }

  this.field.intlTelInput('setCountry', countryString);
};

IntlTelInputWrapper.prototype.isValid = function()  {
  return this.field.intlTelInput("isValidNumber");
};

IntlTelInputWrapper.prototype.fullNumber = function(remove_plus) {
  return remove_plus ? this.field.intlTelInput("getNumber").substr(1) : this.field.intlTelInput("getNumber");
};

IntlTelInputWrapper.prototype.getField = function()  { return this.field };