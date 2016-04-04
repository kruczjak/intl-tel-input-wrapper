var IntlTelInputWrapper = window.IntlTelInputWrapper = function(fieldId, formId) {
  this.countryData = $.fn.intlTelInput.getCountryData();
  if (fieldId) this.field = $(fieldId);
  this.formId = formId;
  this.onChangeSet = false;

  this.formCallback = function()  {
    var self = this;
    this.form = $(formId);

    this.form.submit(function() {
      self.field.val(self.field.intlTelInput("getNumber"));
    });
  };

  this.addCountryCode = function()  {
    var dialCode = this.field.intlTelInput("getSelectedCountryData").dialCode;

    if (this.field.val()[0] != '+' && !!dialCode) {
      this.field.val('+' + dialCode + this.field.val());
    }
  };

  this.validationAddClasses = function(settings)  {
    this.errorClass = settings.errorValidationAddClass;
    this.successClass = settings.successValidationAddClass;
    if (!this.onChangeSet) this.field.keyup(this.validationCallback()).change(this.validationCallback()).change();
    this.onChangeSet = true;
  };

  this.validationCallback = function() {
    var self = this;

    return function(e) {
      if (self.isValid()) {
        if (!!self.errorClass) self.field.removeClass(self.errorClass);
        if (!!self.successClass) self.field.addClass(self.successClass);
        if (!!self.successCallback) self.successCallback(e);
      } else {
        if (!!self.successClass) self.field.removeClass(self.successClass);
        if (!!self.errorClass) self.field.addClass(self.errorClass);
        if (!!self.errorCallback) self.errorCallback(e);
      }
    }
  };

  this.validationCallbacks = function(settings) {
    this.errorCallback = settings.errorValidationCallback;
    this.successCallback = settings.successValidationCallback;
    if (!this.onChangeSet) this.field.keyup(this.validationCallback()).change(this.validationCallback()).change();
    this.onChangeSet = true;
  };
};


/* <<<<<<<< PROTOTYPES >>>>>>>> */

IntlTelInputWrapper.prototype.init = function(settings)  {
  if (!this.field || !this.field.length) return false;
  settings = settings || {};

  this.field.intlTelInput({
    preferredCountries: settings.preferredCountries || ['no', 'se', 'dk', 'fi', 'ee'],
    dropdownContainer: settings.dropdownContainer || '',
    initialCountry: settings.initialCountry || ''
  });

  this.onChangeSet = false;
  if (!!settings.errorValidationAddClass || !!settings.successValidationAddClass) this.validationAddClasses(settings);
  if (!!settings.errorValidationCallback || !!settings.successValidationCallback) this.validationCallbacks(settings);
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