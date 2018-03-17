'use strict';

module.exports = (function() {
	const T = require('../utils');
	const Type = require('./type');

	class _Refernce extends Type{
		constructor(_interface) {
			super(_interface);
		}

		validator() {

		}

		toString() {

		}
	}

	return _Refernce;
})();