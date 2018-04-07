module.exports = (function () {
  const _ = require('../utils');

  class _Type {
    constructor(shapes, predicate, init = _.identity) {
      if (!predicate(shapes)) throw new TypeError(`${shapes} is invalid shape of type.`);
      this.shape = init(shapes);
    }

    static validator() {
      if (!_.isExtends(this, _Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return true;
    }

    validator(...args) {
      return this.constructor.validator.apply(this, args);
    }

    static initializer(value) {
      if (!_.isExtends(this, _Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return value;
    }

    initializer(...args) {
      return this.constructor.initializer.apply(this, args);
    }

    toString() {
      return `Type<${this.shape}>`;
    }
  }

  return _Type;
}());
