'use strict';

module.exports = (function() {
	const Type = require('./type');

	class _Null extends Type{
		constructor() {
			super(_Null);
		}

		validator(value) {
			return T.getType(value) === 'Null';
		}

		toString() {
			return 'Null<Null>';
		}
	}

	return _Null;
})();