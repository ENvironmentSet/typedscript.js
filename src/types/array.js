module.exports = (function () {
  const _ = require('../utils');
  const Type = require('./type');

  class _Array extends Type {
    constructor(shape) {
      super(shape, _(_.isExtends, _, Type));
    }

    static validator(values) {
      if (_.isExtends(this, Type) && _.isArray(values)) {
        const validator = _.bind(this.shape.validator, this.shape);
        return _.size(values) === 0 ? true : _.every(values, validator);
      } throw new Error('Cannot call validator without binding this as instanceof class Type');
    }

    static initializer(value) {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return value || _.reduce(this.shape, (memo, type) => {
        memo.push(type.initializer());
        return memo;
      }, []);
    }

    toString() {
      return `Array<${this.shape}>`;
    }
  }

  return _Array;
}());
