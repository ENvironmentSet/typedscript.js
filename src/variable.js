module.exports = function () {
  const Type = require('./types/type');

  class Variable {
    constructor(type, value) {
      if (!(type instanceof Type)) throw new TypeError(`${type} is not a extend of Type Object`);
      if (!type.validator(value)) throw new TypeError(`<${value}> is invalid value as value of Variable<${type.toString()}>`);
      this.box = type.initializer(value);
      this.type = type;
    }

    validator(value) {
      return this.type.validator(value);
    }

    toString() {
      return `Variable<${this.type}, box<${this.box}>> }`;
    }

    valueOf() {
      return this.box;
    }

    get [Symbol.toStringTag]() {
      return 'Variable';
    }

    bind(fn) {
      return fn(this.box);
    }

    get _() {
      return this.box;
    }

    set _(value) {
      if (!this.type.validator(value)) throw new TypeError(`<${value}> is invalid value as value of Variable<${this.type.toString()}>`);
      else this.box = value;
    }

    get T() {
      return this.type;
    }

    set T(type) {
      this.box = type.initializer();
      this.type = type;
    }
  }


  return Variable;
}();
