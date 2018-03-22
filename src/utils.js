'use strict';

module.exports = (() => {
	const _ = require('partial-js');

	_.isExtends = (obj, fn) => {
		return _.isObject ? Object.create(obj.prototype || Object.getPrototypeOf(obj)) instanceof fn : false;
	};

	return _;
})();