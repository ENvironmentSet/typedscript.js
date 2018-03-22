'use strict';

module.exports = (function() {
	const Type = require('./type');

	class _Boolean extends Type{
		constructor() {
			super(_Boolean);
		}

		validator(value) {
			return T.getType(value) === 'Boolean';
		}

		toString() {
			return 'Boolean<Boolean>';
		}
	}

	return _Boolean;
})();