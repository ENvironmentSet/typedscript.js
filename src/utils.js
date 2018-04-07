module.exports = (() => {
  const _ = require('partial-js');

  _.isExtends = (obj, fn) => (_.isObject(obj) ?
    Object.create(obj.prototype || Object.getPrototypeOf(obj)) instanceof fn :
    false);

  return _;
})();
