'use strict';

module.exports = (function() {
	const MAX_LIST_LENGTH = Math.pow(2, 32) - 1;
	ignore._ = Symbol('ignore<non-ignore argument>');
	ignore.$ = Symbol('partial<ignore argument>');
	partial._ = Symbol('partial<lazy argument>');
	callFunc._ = Symbol('callFunc<No specify context>');

	const getType = value => toString.call(value).replace(/\[|object|]| /g,'');

	const identity = value => value;

	const constant = value => () => value;

	const length = prop('length');

	const push = method('push');

	const shift = method('shift');

	const bind = (fn, context) => function() { return callFunc(fn, context, ...arguments) };

	const getLength = list => list && length(list) >= 0 && length(list) < MAX_LIST_LENGTH ? length(list) : void 0;

	const noop = () => {};

	const not = value => !value;

	const each = loop(nameSpace(
		If( list => isArrayLike(list),
				function(list, iteratee) {
					this.list = list;
					this.iteratee = iteratee;
					this.length = getLength(list);
					this.flag = 'list';
					this.count = 0;
					return this;
				},
				function(list, iteratee) {
					this.list = object(list);
					this.keys = Object.keys(this.list);
					this.length = getLength(this.keys);
					this.iteratee = iteratee;
					this.flag = 'object';
					this.count = 0;
					return this;
				}
				)),
		status => status.count < status.length,
		status => status.count++,
		If( status => status.flag === 'list',
				status => callFunc(status.iteratee, callFunc._, status.list[status.count], status.count, status.list),
				status => callFunc(status.iteratee, callFunc._, status.list[status.keys[status.count]], status.keys[status.count], status.list)
		), prop('list'));

	const reduce = loop(nameSpace(
		If( list => isArrayLike(list),
			function(list, iteratee) {
				this.list = list;
				this.iteratee = iteratee;
				this.length = getLength(list);
				this.flag = 'list';
				this.count = 0;
				this.result = null;
				return this;
			},
			function(list, iteratee) {
				this.list = object(list);
				this.keys = Object.keys(this.list);
				this.length = getLength(this.keys);
				this.iteratee = iteratee;
				this.flag = 'object';
				this.count = 0;
				this.result = null;
				return this;
			}
		)),
		status => status.count < status.length,
		status => status.count++,
		If( status => status.flag === 'list',
			status => status.result = callFunc(status.iteratee, callFunc._, status.result, status.list[status.count]),
			status => status.result = callFunc(status.iteratee, callFunc._, status.result, status.list[status.keys[status.count]])
		), prop('result'));

	const map = loop(nameSpace(
		If( list => isArrayLike(list),
			function(list, iteratee) {
				this.list = list;
				this.iteratee = iteratee;
				this.length = getLength(list);
				this.flag = 'list';
				this.result = [];
				this.count = 0;
				return this;
			},
			function(list, iteratee) {
				this.list = object(list);
				this.keys = Object.keys(this.list);
				this.length = getLength(this.keys);
				this.iteratee = iteratee;
				this.flag = 'object';
				this.result = [];
				this.count = 0;
				return this;
			}
		)),
		status => status.count < status.length,
		status => status.count++,
		If( status => status.flag === 'list',
			status => push(status.result, callFunc(status.iteratee, callFunc._, status.list[status.count], status.count, status.list)),
			status => push(status.result, callFunc(status.iteratee, callFunc._, status.list[status.keys[status.count]], status.keys[status.count], status.list))
		), prop('result'));

	const find = loop(nameSpace(
		If( list => isArrayLike(list),
			function(list, iteratee) {
				this.list = list;
				this.iteratee = iteratee;
				this.length = getLength(list);
				this.flag = 'list';
				this.result = undefined;
				this.count = 0;
				return this;
			},
			function(list, iteratee) {
				this.list = object(list);
				this.keys = Object.keys(this.list);
				this.length = getLength(this.keys);
				this.iteratee = iteratee;
				this.flag = 'object';
				this.result = undefined;
				this.count = 0;
				return this;
			}
		)),
		status => status.count < status.length && status.result === undefined,
		status => status.count++,
		If( status => status.flag === 'list',
			If( status => status.result = callFunc(status.iteratee, callFunc._, status.list[status.count], status.count, status.list),
					status => status.result = status.list[status.count],
					status => status.result = undefined
			),
			If( status => status.result = callFunc(status.iteratee, callFunc._, status.list[status.keys[status.count]], status.keys[status.count], status.list),
				status => status.result = status.list[status.keys[status.count]],
				status => status.result = undefined
			)
		), prop('result'));

	const filter = loop(nameSpace(
		If( list => isArrayLike(list),
			function(list, iteratee) {
				this.list = list;
				this.iteratee = iteratee;
				this.length = getLength(list);
				this.flag = 'list';
				this.count = 0;
				this.result = [];
				return this;
			},
			function(list, iteratee) {
				this.list = object(list);
				this.keys = Object.keys(this.list);
				this.length = getLength(this.keys);
				this.iteratee = iteratee;
				this.flag = 'object';
				this.count = 0;
				this.result = [];
				return this;
			}
		)),
		status => status.count < status.length,
		status => status.count++,
		If( status => status.flag === 'list',
			If( status => callFunc(status.iteratee, callFunc._, status.list[status.count], status.count, status.list),
					status => push(status.result, status.list[status.count])
				),
			If( status => callFunc(status.iteratee, callFunc._, status.list[status.keys[status.count]], status.keys[status.count], status.list),
				status => push(status.result, status.list[status.keys[status.count]])
			)
		), prop('result'));

	function every (list, iteratee) {
		return find(list, (value, index, list) => {
			return not(iteratee(value, index, list));
		}) === undefined;
	}

	function isArrayLike (list) {
		return typeof getLength(list) === 'number';
	}

	function array (list) {
		return isArrayLike(list) ? list : [];
	}

	function arrayCopy (list) {
		return isArrayLike(list) ?  Array.prototype.slice.call(list) : [];
	}

	function object (object) {
		return isObject(object) ? object : {};
	}

	function isObject (value) {
		return not(getType(value) === 'Null' || getType(value) === 'Undefined');
	}

	function prop (name) {
		return obj => object(obj)[name];
	}
	
	function method (name) {
		return function(object) {
			return isObject(object) ? callFunc(object[name], object, ...rest(arguments)) : undefined;
		}
	}

	function rest (list, count = 1) {
		return Array.prototype.slice.call(list, count);
	}

	function rester (fn, count) {
		return function() {
			return callFunc(fn, this, ...rest(arguments, count));
		};
	}

	function If (vaildator, body, except) {
		return function() {
			return callFunc(vaildator, this, ...arguments) ?
				callFunc(body, this, ...arguments) :
				callFunc(except, this, ...arguments);
		};
	}

	function While (vaildator, body, resolver) {
		return function(init) {
			const status = init(...rest(arguments));
			while(vaildator(status)) body(status);
			return callFunc(resolver, callFunc._, status);
		};
	}

	function loop (init, vaildator, after, body, resolver) {
		const inside = While(vaildator, status => {
			body(status);
			after(status);
		}, resolver);
		return function() {
			return inside(init, ...arguments);
		}
	}

	function partial (fn) {
		let args = rest(arguments);
		return function() {
			let callArgs = arrayCopy(args);
			let newArgs = arrayCopy(arguments);
			each(callArgs,If( value => value === partial._, (value, index, list) => list[index] = shift(newArgs)));
			return callFunc(fn, this, ...callArgs);
		}
	}

	function ignore (fn) {
		let args = rest(arguments);
		return function() {
			let newArgs = arrayCopy(arguments);
			let callArgs = constant([])();
			reduce(args,
				If( (result, value) => value === ignore._,
					result => { push(callArgs, shift(newArgs)); return result;},
					If( (result, value) => value === ignore.$,
						(result) => {  shift(newArgs); return result;},
						(result, value) => { push(callArgs, value); return result;}
						)
				), callArgs);
			return callFunc(fn, this, ...callArgs);
		};
	}

	function nameSpace (predicate) {
		let space = {};
		return function() {
			return callFunc(predicate, space, ...arguments);
		}
	}

	function isExtends (obj, fn) {
		return Object.create(object(obj).prototype || Object.getPrototypeOf(object(obj))) instanceof fn;
	}

	function callFunc (fn, context) {
		return typeof fn === 'function' ? fn.apply(object(context), rest(arguments, 2)) : void fn;
	}

	return {
		'identity' : identity,
		'constant' : constant,
		'getLength' : getLength,
		'isArrayLike' : isArrayLike,
		'array' : array,
		'object' : object,
		'noop' : noop,
		'not' : not,
		'isObject' : isObject,
		'rest' : rest,
		'rester' : rester,
		'prop' : prop,
		'if' : If,
		'partial' : partial,
		'getType' : getType,
		'ignore' : ignore,
		'bind' : bind,
		'nameSpace' : nameSpace,
		'method' : method,
		'isExtends' : isExtends,
		'while' : While,
		'loop' : loop,
		'callFunc' : callFunc,
		'each' : each,
		'reduce' : reduce,
		'map' : map,
		'find' : find,
		'filter' : filter
	};
})();