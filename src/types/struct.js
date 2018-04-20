module.exports = (function () {
  const Type = require('./type');
  const _ = require('../utils');

  class _Struct extends Type {
    constructor(shapes) {
      super(shapes, _(
        _.every, _,
        element => _.isExtends(element, Type) || element === _Struct.self,
      ));
    }

    static validator(struct) {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return _.every(this.shape, (type, index) => {
        if (_.has(struct, index)) {
          if (type === _Struct.self) {
            return struct[index] === null ? true : this.validator(struct[index]);
          }
          return type.validator(struct[index]);
        } return false;
      }) && _.size(this.shape) === _.size(struct);
    }

    static initializer(value) {
      if (!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
      return value || _.reduce(this.shape, (memo, type, name) => {
        memo[name] = type.initializer();
        return memo;
      }, {});
    }

    toString() {
      return `Struct<${this.shape}>`;
    }
  }

  _Struct.self = Symbol('@self');

  return _Struct;
}());
