module.exports = (function () {
  const Type = require('./type');
  const _ = require('../utils');

  class _Interface extends Type {
    constructor(shapes) {
      super(shapes);
    }

    static validator(functions) {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return _.every(this.shape, (value, index) => {
        if (index in functions) {
          return !value.validator(functions[index]);
        } return false;
      });
    }

    static initializer() {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
    }

    toString() {

    }
  }

  return _Interface;
}());
