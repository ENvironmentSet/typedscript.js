'use strict';

module.exports = (function() {
	const Type = require('./type');
	const _ = require('../utils');

	class _Float extends Type{
		constructor() {
			super(_Float, _.constant(true));
		}

		static validator(value) {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
			return toString.call(value) === '[object Number]';
		}

		toString() {
			return 'Float<Float>';
		}
	}

	return _Float;
})();