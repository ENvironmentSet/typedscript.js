module.exports = (function () {
  const Type = require('./type');
  const _ = require('../utils');

  class _Function extends Type {
    constructor(shape) {
      super(shape, _(_.every, _, _(_.isExtends, _, Type)));
    }

    static validator(parameters) {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      if (typeof parameters === 'function') return true;
      return _.every(this.shape, (type, index) => {
        if (_.has(parameters, index)) {
          return type.validator(parameters[index]);
        }
        return false;
      });
    }

    static initializer(value) {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return value[1] || _.noop;
    }

    toString() {
      return `Function<${this.shape}>`;
    }
  }

  return _Function;
}());
