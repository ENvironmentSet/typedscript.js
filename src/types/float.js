'use strict';

module.exports = (function() {
	const Type = require('./type');

	class _Float extends Type{
		constructor() {
			super(_Float);
		}

		validator(value) {
			return T.getType(value) === 'Number';
		}

		toString() {
			return 'Float<Float>';
		}
	}

	return _Float;
})();