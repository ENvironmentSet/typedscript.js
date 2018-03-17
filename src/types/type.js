'use strict';

module.exports = (function() {
	const T = require('../utils');

	class _Type {
		constructor(_interface) {
			if(T.not(T.isArrayLike(_interface))) throw new TypeError(`${_interface} is not interface of type.`);
			if(T.getType(_interface) === 'Function') this.type = [_interface];
			else this.type = _interface;
			if(T.not(T.every(this.type, t => t instanceof _Type || t.prototype instanceof _Type)))
				throw new TypeError(`${_interface} is not interface of type`);
		}

		validator() {
			return true;
		}

		toString() {
			throw `Type<${this._interface}>`;
		}
	}

	return _Type;
})();