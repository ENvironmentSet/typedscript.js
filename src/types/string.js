'use strict';

module.exports = (function() {
	const T = require('../utils');
	const Type = require('./type');

	class _String extends Type{
		constructor() {
			super(_String);
		}

		validator(value) {
			return T.getType(value) === 'String';
		}

		toString() {
			return 'String<String>'
		}
	}

	return _String;
})();