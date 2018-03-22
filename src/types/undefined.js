'use strict';

module.exports = (function() {
	const Type = require('./type');
	const _ = require('../util');

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