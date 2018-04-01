const T = require('../index');

describe('Vairable test suit', function () {

	it('should be ok <Atomic>', function () {
		console.log(T(T.integer, 0));
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

});