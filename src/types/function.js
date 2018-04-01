'use strict';

module.exports = (function() {
	const Type = require('./type');
	const _ = require('../utils');

	class _Function extends Type{
		constructor(shape) {

			super(shape);
		}

		static validator() {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');

		}

		toString() {

		}
	}

	return _Function;
})();