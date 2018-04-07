module.exports = (function () {
  const Type = require('./type');
  const _ = require('../utils');

  class _Boolean extends Type {
    constructor() {
      super(_Boolean, _.constant(true));
    }

    static validator(value) {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return toString.call(value) === '[object Boolean]';
    }

    static initializer(value) {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return value || false;
    }

    toString() {
      return 'Boolean<Boolean>';
    }
  }

  return _Boolean;
}());
