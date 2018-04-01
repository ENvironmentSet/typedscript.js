'use strict';

module.exports = (function() {
	const Type = require('./type');
	const _ = require('../utils');

	class _Struct extends Type{
		constructor(shapes) {
			super(shapes, _(_.every, _, _(_.isExtends, _, Type)));
		}

		static validator(struct) {
			if(!_.isExtends(this, Type)) throw new Error('Cannot call validator without binding this as instanceof class Type');
			return _.every(this.shape, (value, index) => {
				if(struct.hasOwnProperty(index)) {
					return value.validator(struct[index]);
				} else return false;
			});
		}

		toString() {
   		return `Struct<${this.shape}>`
		}
	}

	return _Struct;
})();