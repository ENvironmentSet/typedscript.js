'use strict';

module.exports = (function() {
	const _ = require('../utils');

	class _Type {
		constructor(shapes) {
			if(_.some(shapes, _.negate(_(_.isExtends, _, _Type)))) throw new TypeError(`${shapes} is invalid shape of type.`);
			this.shape = shapes;
		}

		static validator() {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
			return true;
		}

		static resolveShape (shape) {

		}

		validator () {
			return this.constructor.validator.apply(this, arguments);
		}

		toString() {
			return `Type<${this.shape}>`;
		}
	}

	return _Type;
})();