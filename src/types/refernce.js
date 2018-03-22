'use strict';

module.exports = (function() {
	const Type = require('./type');
	const _ = require('../utils');

	class _Refernce extends Type{
		constructor(_interface) {
			super(_interface);
		}

		static validator() {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
		}

		validator () {
			return this.constructor.validator.apply(this, arguments);
		}

		toString() {

		}
	}

	return _Refernce;
})();