'use strict';

module.exports = (function() {
	const Type = require('./types/type');

	class Variable {
		constructor(type, value) {
			if(!type instanceof Type) throw new TypeError(`${type} is not a extend of Type Object`);
			if(!type.validator(value)) throw new TypeError(`${value} is invalid value as value of Variable<${type.toString()}>`);
			this.value = value;
			this.type = type;
		}

		validator(value) {
			return this.type.validator(value);
		}

		toString() {
			return `Variable<${this.type.toString()}, value<${this.value}>> }`;
		}

		bind (fn) {
			return fn(this.value);
		}
	}

	return Variable;
})();