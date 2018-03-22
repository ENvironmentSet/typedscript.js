'use strict';

module.exports = (function() {
	const Type = require('./type');

	class _Symbol extends Type{
		constructor() {
			super(_Symbol);
		}

		validator(value) {
			return T.getType(value) === 'Symbol';
		}

		toString() {
			return 'Symbol<Symbol>'
		}
	}

	return _Symbol;
})();