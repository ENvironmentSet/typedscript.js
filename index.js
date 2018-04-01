'use strict';

module.exports = (function() {
	const variable = require('./src/variable');
	const _ = require('./src/utils');
	const Type = require('./src/types/type');
	function T (type, shape) { // shape equals value
		if(typeof type === 'function' && _.isExtends(type, Type)) return new type(shape);
		else {
			let tmp = new variable(type, shape);
			if(new.target) return Object.assign(this, tmp);
			else return tmp;
		}
	}
	T.prototype = Object.create(variable.prototype, {
		'constructor' : {
			'value' : variable,
			'writable' : false
		}
	});
	return Object.assign(T, {
		'Undefined' : require('./src/types/undefined'),
		'Null' : require('./src/types/null'),
		'Integer' : require('./src/types/integer'),
		'Float' : require('./src/types/float'),
		'Boolean' : require('./src/types/boolean'),
		'Symbol' : require('./src/types/symbol'),
		'Array' : require('./src/types/array'),
		'Struct' : require('./src/types/struct'),
		'String' : require('./src/types/string'),
		'Interface' : require('./src/types/interface'),
		'Refernce' : require('./src/types/refernce'),
		'Function' : require('./src/types/function'),
		'Type' : Type
	});
})();