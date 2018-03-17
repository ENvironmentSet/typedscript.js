const T = require('../index');
const assert = require('assert');

describe('Vairable test suit', function () {

	it('undefined type test', function () {
		let variable = new T(new T.Undefined, undefined);
		assert.equal(variable.bind(T.identity), undefined);
	});

	it('integer type test', function () {
		let variable = new T(new T.Integer, 1);
		assert.equal(variable.bind(T.identity), 1);
	});

	it('float type test', function () {
		let variable = new T(new T.Float, 1.1);
		assert.equal(variable.bind(T.identity), 1.1);
	});

	it('string type test', function () {
		let variable = new T(new T.String, 'Hello');
		assert.equal(variable.bind(T.identity), 'Hello');
	});

	it('null type test', function () {
		let variable = new T(new T.Null, null);
		assert.equal(variable.bind(T.identity), null);
	});

	it('boolean type test', function () {
		let variable = new T(new T.Boolean, true);
		assert.equal(variable.bind(T.identity), true);
	});

	it('symbol type test', function () {
		let sym = Symbol('a');
		let variable = new T(new T.Symbol, sym);
		assert.equal(variable.bind(T.identity), sym);
	});
});
