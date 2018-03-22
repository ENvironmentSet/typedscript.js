'use strict';

module.exports = (function() {
	const _ = require('../util');

	class _Type {
		constructor(shape) {
			let typeShape =_.flatten(_.toArray(arguments));
			if(!_.every(typeShape, _(_.isExtends, _, _Type))) throw new TypeError(`${shape} is invalid shape of type.`);
			this.shape = shape;
		}

		validator() {
			return true;
		}

		toString() {
			throw `Type<${this.shape}>`;
		}
	}

	return _Type;
})();