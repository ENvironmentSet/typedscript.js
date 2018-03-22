'use strict';

module.exports = (function() {
	const _ = require('../utils');
	const Type = require('./type');

	class _Array extends Type{
		constructor(shapes) {
			super(shapes);
		}

		static validator(values) {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
			let type = _.first(this.shape);
			return !_.some(values, _.negate(_.pipe(_.identity, _.bind(type.validator, type))));
		}

		validator () {
			return this.constructor.validator.apply(this, arguments);
		}

		toString() {
			return `Array<${this.shape}>`;
		}
	}

	return _Array;
})();