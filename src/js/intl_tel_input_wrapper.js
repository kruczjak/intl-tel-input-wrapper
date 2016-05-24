var IntlTelInputWrapper = window.IntlTelInputWrapper = function(fieldId, formId, formatedFieldId) {
  this.countryData = $.fn.intlTelInput.getCountryData();
  if (fieldId) this.field = $(fieldId);
  this.formId = formId;
  this.formatedFieldId = formatedFieldId;

  this.formCallback = function()  {
    var self = this;
    this.form = $(formId);

    this.form.submit(function() {
      if (!self.formatedFieldId) {
        self.field.val(self.fullNumber(true));
      } else {
        $(self.formatedFieldId).val(self.fullNumber(true));
      }
    });
  };

  this.addCountryCode = function()  {
    var dialCode = this.field.intlTelInput("getSelectedCountryData").dialCode;

    if (this.field.val()[0] != '+' && !!dialCode) {
      this.field.val('+' + dialCode + this.field.val());
    }
  };

  this.validationCallback = function() {
    var self = this;

    return function(e) {
      if (self.isValid()) {
        if (!!self.errorClass) self.field.removeClass(self.errorClass);
        if (!!self.successClass) self.field.addClass(self.successClass);
        if (!!self.successCallback) self.successCallback(e, self);
      } else {
        if (!!self.successClass) self.field.removeClass(self.successClass);
        if (!!self.errorClass) self.field.addClass(self.errorClass);
        if (!!self.errorCallback) self.errorCallback(e, self);
      }
    }
  };

  this.validationCallbacks = function(settings) {
    this.errorClass = settings.errorValidationAddClass;
    this.successClass = settings.successValidationAddClass;
    this.errorCallback = settings.errorValidationCallback;
    this.successCallback = settings.successValidationCallback;
    this.field.keyup(this.validationCallback()).change(this.validationCallback()).change();
  };
};


/* <<<<<<<< PROTOTYPES >>>>>>>> */

IntlTelInputWrapper.prototype.init = function(settings)  {
  if (!this.field || !this.field.length) return false;
  settings = settings || {};

  this.field.intlTelInput({
    preferredCountries: settings.preferredCountries || ['no', 'se', 'dk', 'fi', 'ee'],
    dropdownContainer: settings.dropdownContainer || '',
    initialCountry: settings.initialCountry || '',
    separateDialCode: settings.separateDialCode || false
  });

  if (!!settings.errorValidationAddClass || !!settings.successValidationAddClass ||
    !!settings.errorValidationCallback || !!settings.successValidationCallback) this.validationCallbacks(settings);

  if (settings.addCountryCode) this.addCountryCode();
  if (this.formId) this.formCallback();
};

IntlTelInputWrapper.prototype.initWithJQuery = function(field, settings) {
  if (!field || !field.length) return false;

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
