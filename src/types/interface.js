module.exports = (function () {
  const Type = require('./type');
  const _ = require('../utils');

  class _Interface extends Type {
    constructor(shapes) {
      super(shapes, _(_.every, _, _(_.isExtends, _, Type)));
    }

    static validator(struct) {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return _.size(this.shape) === 0 ? true : _.every(this.shape, (type, index) => {
        if (_.has(struct, index)) {
          return type.validator(struct[index]);
        } return true;
      });
    }

    static initializer(value) {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return value || _.reduce(this.shape, (memo, type, name) => {
        memo[name] = type.initializer();
        return memo;
      }, {});
    }

    toString() {
      return `Interface<${this.shape}>`;
    }
  }

  return _Interface;
}());
