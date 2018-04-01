'use strict';

module.exports = (function() {
	const Type = require('./type');
	const _ = require('../utils');

	class _Undefined extends Type{
		constructor() {
			super(_Undefined, _.constant(true));
		}

		static validator(value) {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
			return value === undefined;
		}

		toString() {
			return 'Undefined<Undefined>';
		}
	}

	return _Undefined;
})();