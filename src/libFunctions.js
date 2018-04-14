module.exports = (function () {
  const Function = require('./types/function');
  const _ = require('./utils');

  function call(func, ...params) {
    if (_.isExtends(func.T, Function) && func.validator(params)) {
      return func._.apply(this, params);
    } throw new TypeError(`${func}, (${params}) is wrong arguments to call function`);
  }

  return {
    call,
  };
}());
