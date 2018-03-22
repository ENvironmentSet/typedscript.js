'use strict';

module.exports = (function() {
	return Object.assign(require('./src/variable'), require('./src/utils'), {
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
		'Type' : require('./src/types/type')
	});
})();