const T = require('../index');

describe('Vairable test suit', function () {

	it('Variable<Array> test', function () {
		let x = new T.Array(new T.Integer);
		console.log(new T(x, [1, 2, 3]));
	});

	it('Variable<Array> Error test', function () {
		let x = new T.Array(new T.Integer);
		try{
			console.log(new T(x, [1, 2, 3.1]));
		} catch (e) {
			console.log(e);
		}
	});

});
