const T = require('../index');

describe('Vairable test suit', function () {

	it('should be ok <Atomic>', function () {
		let undef = T(T.Undefined);
		console.log(T(undef, undefined));
		console.log(new T(undef, undefined));
	});

});