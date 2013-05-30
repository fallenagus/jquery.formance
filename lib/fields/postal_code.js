// Generated by CoffeeScript 1.6.2
(function() {
  var $, formatBackPostalCode, formatPastePostalCode, formatPostalCode, hasTextSelected, restrictPostalCode;

  $ = jQuery;

  hasTextSelected = $.formance.fn.hasTextSelected;

  restrictPostalCode = function(e) {
    var $target, char, value;

    $target = $(e.currentTarget);
    char = String.fromCharCode(e.which);
    if (!/^[a-zA-Z\d]+$/.test(char)) {
      return;
    }
    if (hasTextSelected($target)) {
      return;
    }
    value = $target.val() + char;
    value = value.replace(/[^a-zA-Z\d]/g, '');
    if (value.length > 6) {
      return false;
    }
  };

  formatPostalCode = function(e) {
    var $target, char, old_val, val;

    char = String.fromCharCode(e.which);
    if (!/^[a-zA-Z\d]+$/.test(char)) {
      return;
    }
    $target = $(e.currentTarget);
    old_val = $target.val();
    val = old_val + char.toUpperCase();
    if (old_val === '') {
      e.preventDefault();
      if (/^[ABCEFGHJKLMNPRSTVXY]$/.test(val)) {
        return $target.val(val);
      }
    } else if (/^[ABCEFGHJKLMNPRSTVXY]$/.test(old_val)) {
      e.preventDefault();
      if (/^[ABCEFGHJKLMNPRSTVXY][0-9]$/.test(val)) {
        return $target.val(val);
      }
    } else if (/^[ABCEFGHJKLMNPRSTVXY][0-9]$/.test(old_val)) {
      e.preventDefault();
      if (/^[ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ]$/.test(val)) {
        return $target.val("" + val + " ");
      }
    } else if (/^[ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ]\s$/.test(old_val)) {
      e.preventDefault();
      if (/^[ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ]\s?[0-9]$/.test(val)) {
        return $target.val(val);
      }
    } else if (/^[ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ]\s?[0-9]$/.test(old_val)) {
      e.preventDefault();
      if (/^[ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ]\s?[0-9][ABCEFGHJKLMNPRSTVWXYZ]$/.test(val)) {
        return $target.val(val);
      }
    } else if (/^[ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ]\s?[0-9][ABCEFGHJKLMNPRSTVWXYZ]$/.test(old_val)) {
      e.preventDefault();
      if (/^[ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ]\s?[0-9][ABCEFGHJKLMNPRSTVWXYZ][0-9]$/.test(val)) {
        return $target.val(val);
      }
    }
  };

  formatBackPostalCode = function(e) {
    var $target, value;

    if (e.meta) {
      return;
    }
    $target = $(e.currentTarget);
    value = $target.val();
    if (e.which !== 8) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (/[ABCEFGHJKLMNPRSTVWXYZ](\s)+$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/[ABCEFGHJKLMNPRSTVWXYZ](\s)*$/, ''));
    }
  };

  formatPastePostalCode = function(e) {
    var _this = this;

    return setTimeout(function() {
      var $target, first_part, full, second_part, val, _ref;

      $target = $(e.currentTarget);
      val = $target.val();
      _ref = val.match(/^([ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ])\s?([0-9][ABCEFGHJKLMNPRSTVWXYZ][0-9])$/), full = _ref[0], first_part = _ref[1], second_part = _ref[2];
      return $target.val("" + first_part + " " + second_part);
    });
  };

  $.formance.fn.formatPostalCode = function() {
    this.formance('restrictAlphaNumeric');
    this.on('keypress', restrictPostalCode);
    this.on('keypress', formatPostalCode);
    this.on('keydown', formatBackPostalCode);
    this.on('paste', formatPastePostalCode);
    return this;
  };

  $.formance.validatePostalCode = function(val) {
    if (val == null) {
      return false;
    }
    val = val.replace(/\s+/g, '');
    if (!/^[a-zA-Z\d]+$/.test(val)) {
      return false;
    }
    val = val.replace(/[^a-zA-Z\d]/g, '');
    return /^[ABCEFGHJKLMNPRSTVXY][0-9][ABCEFGHJKLMNPRSTVWXYZ]\s?[0-9][ABCEFGHJKLMNPRSTVWXYZ][0-9]$/.test(val.toUpperCase());
  };

}).call(this);