'use strict';

module.exports = (function() {
	const Type = require('./type');
	const _ = require('../utils');

	class _Function extends Type{
		constructor(shape) {
			super(shape, _(_.every, _, _(_.isExtends, _, Type)));
		}

		static validator(parameters) {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
			if(parameters[0] === _Function.defineBody && typeof parameters[1] === 'function') return true;
			else return _.every(this.shape, (type, index) => {
				if(parameters.hasOwnProperty(index)) {
					return type.validator(parameters[index]);
				} else return false;
			});
		}

		static initializer(value) {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
			return value[1] || _.noop;
		}

		toString() {
			return `Function<${this.shape}>`
		}
	}
	_Function.defineBody = Symbol('define function body');

	return _Function;
})();