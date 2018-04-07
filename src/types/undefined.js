module.exports = (function () {
  const Type = require('./type');
  const _ = require('../utils');

  class _Undefined extends Type {
    constructor() {
      super(_Undefined, _.constant(true));
    }

    static validator(value) {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return value === void 0;
    }

    static initializer() {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return void 0;
    }

    toString() {
      return 'Undefined<Undefined>';
    }
  }

  return _Undefined;
}());
