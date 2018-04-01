'use strict';

module.exports = (function() {
	const _ = require('../utils');
	const Type = require('./type');

	class _Array extends Type{
		constructor(shape) {
			super(shape, _(_.isExtends, _, Type));
		}

		static validator(values) {
			if (_.isExtends(this, Type)) {
				let validator = _.bind(this.shape.validator, this.shape);
				return _.every(values, validator) && _.isArray(values);
			} else throw new Error('Cannot call validator without binding this as instanceof class Type');
		}

		toString() {
			return `Array<${this.shape}>`;
		}
	}

	return _Array;
})();