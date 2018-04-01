'use strict';

module.exports = (function() {
	const Type = require('./type');
	const _ = require('../utils');

	class _Integer extends Type{
		constructor() {
			super(_Integer, _.constant(true));
		}

		static validator(value) {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
			return toString.call(value) === '[object Number]' && Number.isInteger(value);
		}

		initializer(value) {
			return value || 0;
		}

		toString() {
			return 'Integer<Integer>';
		}
	}

	return _Integer;
})();