'use strict';

module.exports = (function() {
	const Type = require('./type');
	const _ = require('../utils');

	class _Struct extends Type{
		constructor() {
			super();
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

	return _Struct;
})();