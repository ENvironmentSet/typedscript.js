'use strict';

module.exports = (function() {
	const Type = require('./type');
	const _ = require('../utils');

	class _Symbol extends Type{
		constructor() {
			super(_Symbol);
		}

		static validator(value) {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
			return toString.call(value) === '[object Symbol]';
		}

		validator () {
			return this.constructor.validator.apply(this, arguments);
		}

		toString() {
			return 'Symbol<Symbol>'
		}
	}

	return _Symbol;
})();