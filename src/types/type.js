'use strict';

module.exports = (function() {
	const _ = require('../util');

	class _Type {
		constructor(shape) {
			let typeShape = _.toArray(shape);
			_.throw(_.every(typeShape, _(_.isExtends(_, _Type))), _.constant());
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