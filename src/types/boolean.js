'use strict';

module.exports = (function() {
	const Type = require('./type');
	const _ = require('../utils');

	class _Boolean extends Type{
		constructor() {
			super(_Boolean);
		}

		static validator(value) {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
			return toString.call(value) === '[object Boolean]';
		}

		validator () {
			return this.constructor.validator.apply(this, arguments);
		}

		toString() {
			return 'Boolean<Boolean>';
		}
	}

	return _Boolean;
})();