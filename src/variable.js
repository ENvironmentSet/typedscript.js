'use strict';

module.exports = (function() {
	const Type = require('./types/type');

	class Variable {
		constructor(type, value) {
			if (!type instanceof Type) throw new TypeError(`${type} is not a extend of Type Object`);
			if (!type.validator(value)) throw new TypeError(`<${value}> is invalid value as value of Variable<${type.toString()}>`);
			//기본값 설정 필요. type.init은 어떨까?
			this.box = value;
			this.type = type;
		}

		validator(value) {
			return this.type.validator(value);
		}

		toString() {
			return `Variable<${this.type}, box<${this.box}>> }`;
		}

		bind(fn) {
			return fn(this.value);
		}

		get _ () {
			return this.box;
		}

		set _ (value) {
			if (!this.type.validator(value)) throw new TypeError(`<${value}> is invalid value as value of Variable<${this.type.toString()}>`);
			return this.box = value;
		}

		get T () {
			return this.type;
		}

		set T (type) {
			//기본값 설정 필요.
			return this.type = type;
		}

	}


	return Variable;
})();