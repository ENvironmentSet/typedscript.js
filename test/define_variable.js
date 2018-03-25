const T = require('../index');

describe('Vairable test suit', function () {

	it('Variable<Struct< a : T.Integer<Integer>, b : T.Boolean<Boolean>>> test', function () {
		let x = new T.Struct({ a : new T.Integer, b : new T.Boolean});
		console.log(new T(x, { a : 1, b : true}));
	});

});
