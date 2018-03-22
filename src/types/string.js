'use strict';

module.exports = (function() {
	const Type = require('./type');
	const _ = require('../utils');

	class _String extends Type{
		constructor() {
			super(_String);
		}

		static validator(value) {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
			return toString.call(value) === '[object String]';
		}

		validator () {
			return this.constructor.validator.apply(this, arguments);
		}

		toString() {
			return 'String<String>'
		}
	}

	return _String;
})();