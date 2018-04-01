const T = require('../index');

describe('Vairable test suit', function () {

	it('should be ok <Atomic>', function () {
		console.log(T(T.integer, 1));
		console.log(new T(T.integer, 0));
	});

	it('should be ok <Struct>', function () {
		let ints = T(T.Struct, { a : T.integer, b : T.integer});
		console.log(T(ints, {a : 1, b : 2}));
		console.log(new T(ints, {a : 1, b : 2}));
	});

	it('should be ok <Array>', function () {
		let arr = T(T.Array, T.integer);
		console.log(T(arr, [1,2,3,4,5]));
		console.log(new T(arr, [1,2,3,4,5]));
	});

	it('should be ok <Function>', function () {
		let shape = T(T.Function, [T.integer, T.integer]);
		let f = T(shape, [T.Function.defineBody, (x, y) => x+y]);
		function call (func, ...params) {
			if(typeof func._ === 'function' && func.T.validator(params)) {
				return func._.apply(this, params);
			} else return undefined;
		}
		console.log(call(f, 1, 2));
		console.log(f);
	});

});