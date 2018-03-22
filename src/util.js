'use strict';

module.exports = (() => {
	const _ = require('partial-js');

	_.throw = function (vaildator, error) {
		let args = _.rest(arguments, 2);
		if(vaildator(args)) throw error();
		else return args;
	};

	_.isExtends = (obj, fn) => {
		return _.isObject ? Object.create(obj.prototype || Object.getPrototypeOf(obj)) instanceof fn : false;
	};

	return _;
})();