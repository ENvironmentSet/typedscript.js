module.exports = (function () {
  const Variable = require('./src/variable');
  const _ = require('./src/utils');
  const Type = require('./src/types/type');
  const Function = require('./src/types/function');
  const libFunctions = require('./src/libFunctions');

  function T(A, B, ...params) { // shape equals value
    if (typeof A === 'function' && _.isExtends(A, Type)) return new A(B);
    else if (_.isExtends(A, Variable) && typeof B === 'function') return A.bind(B);
    else if (_.isExtends(A, Variable) && _.isExtends(A.T, Function)) {
      return libFunctions.call(A, ...[B, ...params]);
    } else if (_.isExtends(A, Variable)) return A._;
    else if (!_.isExtends(A, Type) && !_.isExtends(B, Variable)) {
      switch (typeof A) {
        case 'undefined':
          return new Variable(T.undefined, A);
        case 'boolean':
          return new Variable(T.boolean, A);
        case 'number':
          return new Variable(T.float, A);
        case 'string':
          return new Variable(T.string, A);
        case 'symbol':
          return new Variable(T.symbol, A);
        default:
          throw new TypeError('only atomic value can be Variable by quick-type-inference system.');
      }
    } else if (!_.isExtends(A, Type)) return A;
    const tmp = new Variable(A, B);
    if (new.target) return Object.assign(this, tmp);
    return tmp;
  }

  T.prototype = Object.create(Variable.prototype, {
    constructor: {
      value: Variable,
      writable: false,
    },
  });
  return Object.assign(T, {
    Undefined: require('./src/types/undefined'),
    undefined: new (require('./src/types/undefined'))(),
    Null: require('./src/types/null'),
    null: new (require('./src/types/null'))(),
    Integer: require('./src/types/integer'),
    integer: new (require('./src/types/integer'))(),
    Float: require('./src/types/float'),
    float: new (require('./src/types/float'))(),
    Boolean: require('./src/types/boolean'),
    boolean: new (require('./src/types/boolean'))(),
    Symbol: require('./src/types/symbol'),
    symbol: new (require('./src/types/symbol'))(),
    String: require('./src/types/string'),
    string: new (require('./src/types/string'))(),
    Array: require('./src/types/array'),
    Struct: require('./src/types/struct'),
    Interface: require('./src/types/interface'),
    Function,
    Type,
  }, libFunctions);
}());
