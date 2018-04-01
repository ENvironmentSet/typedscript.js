'use strict';

module.exports = (() => {
	const _ = require('partial-js');

	_.isExtends = (obj, fn) => _.isObject ? Object.create(obj.prototype || Object.getPrototypeOf(obj)) instanceof fn : false;

	_.assert = (expected, tester, error) => {
		if(typeof expected === tester) return true;
		else if(error) throw error;
		else return false;
	};

	return _;
})();