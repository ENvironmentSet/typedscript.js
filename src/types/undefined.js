'use strict';

module.exports = (function() {
	const T = require('../utils');
	const Type = require('./type');

	class _Undefined extends Type{
		constructor() {
			super(_Undefined);
		}

		validator(value) {
			return T.getType(value) === 'Undefined';
		}

		toString() {
			return 'Undefined<Undefined>';
		}
	}

	return _Undefined;
})();