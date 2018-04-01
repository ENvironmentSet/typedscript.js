'use strict';

module.exports = (function() {
	const _ = require('../utils');

	//기본값 설정 필요. 심볼을 이용하면 괜찮을 듯.

	class _Type {
		constructor(shapes, predicate, init = _.identity) {
			if(!predicate(shapes)) throw new TypeError(`${shapes} is invalid shape of type.`);
			this.shape = init(shapes);
		}

		static validator() {
			if(!_.isExtends(this, _Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
			return true;
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