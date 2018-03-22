'use strict';

module.exports = (function() {
	const Type = require('./type');

	class _Integer extends Type{
		constructor() {
			super(_Integer);
		}

		validator(value) {
			return T.getType(value) === 'Number' && Number.isInteger(value);
		}

		toString() {
			return 'Integer<Integer>';
		}
	}

	return _Integer;
})();