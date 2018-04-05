const T = require('../index');

describe('Vairable test suit', function () {

	it('should be ok <Atomic>', function () {
		console.log(T(T.integer, 1));
		console.log(T(T(T.integer, 0)));
	});

	it('should be ok <Struct>', function () {
		let ints = T(T.Struct, { a : T.integer, b : T.integer});
		console.log(T(ints, {a : 1, b : 2}));
	});

	it('should be ok <Array>', function () {
		let arr = T(T.Array, T.integer);
		console.log(T(arr, [1,2,3,4,5]));
	});

	it('should be ok <Function> 1', function () {
		let shape = T(T.Function, [T.integer, T.integer]);
		let f = T(shape, [T.Function.defineBody, (x, y) => x+y]);
		console.log(T.call(f, 1, 2));
	});

	it('should be ok <Function> 2', function () {
		let ints = T(T.Struct, { a : T.integer, b : T.integer});
		let shape = T(T.Function, [ints, ints]);
		let f = T(shape, [T.Function.defineBody, (x, y) => x.a+x.b+y.a+y.b]);
		console.log(T.call(f, { a : 1, b : 2}, { a : 3, b : 4}));
	});

	it('should be ok <Function> 3', function () {
		let shape = T(T.Function, [T.boolean, T.boolean]);
		let f = T(shape, [T.Function.defineBody, (x, y) => x && y]);
		console.log(T.call(f, true, false));
		try {
			console.log(T.call(f, 1, 2));
		} catch(e) {
			console.log(e);
		}
	});

});