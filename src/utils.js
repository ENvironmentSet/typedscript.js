'use strict';

module.exports = (function() {
	const MAX_LIST_LENGTH = Math.pow(2, 32) - 1;
	ignore._ = Symbol('ignore<non-ignore argument>');
	ignore.$ = Symbol('partial<ignore argument>');
	partial._ = Symbol('partial<lazy argument>');

	const getType = value => toString.call(value).replace(/\[|object|]| /g,'');

	const identity = value => value;

	const constant = value => () => value;

	const length = prop('length');

	const push = prop('push');

	const shift = prop('shift');

	const bind = (fn, context) => function() { return fn.apply(context, arguments) };

	const getLength = list => list && length(list) >= 0 && length(list) < MAX_LIST_LENGTH ? length(list) : void 0;

	const noop = () => {};

	const not = value => !value;

	const reduce = bloop(identity,
		If(	(predicateResult, value, index, list) => getLength(list)-1 === index,
			predicateResult => [true, predicateResult],
			() => [false] // will use Monad<Nothing>
		),
		result => bind(shift(Array.prototype), result)());

	const each = bloop(array, noop);

	const some = bloop(noop, Boolean, identity);

	const map = bloop(constant([]), ignore(If( ok => ok,
		(ok ,value, result) => bind(push(Array.prototype),result)(value)
	), ignore._, ignore._, ignore.$, ignore.$, ignore._));
	
	const every = bloop(constant(true), Boolean, not);

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
		return object => isObject(object) ? object[name] : undefined;
	}

	function rest (list, count = 1) {
		return Array.prototype.slice.call(list, count);
	}

	function rester (fn, count) {
		return function() {
			return fn.apply(this, rest(arguments, count));
		};
	}

	function If (vaildator, body, except) {
		return function() {
			return vaildator.apply(this, arguments) ?
				body && body.apply(this, arguments) :
				except && except.apply(this, arguments);
		};
	}

	function bloop (init, body, stoper) { // need chain now!!!!!
		return function(list, iteratee) {
			let result = init(list);
			if(isArrayLike(list)) {
				for(let index = 0, length = getLength(list); index < length; index++) {
					let memo = body(iteratee(list[index], index, list, result), list[index],  index, list, result);
					if(stoper && stoper(memo)) return memo;
				}
			} else {
				for(let index = 0, keys = Object.keys(object(list)), length = keys.length; index < length; index++) {
					let memo = body(iteratee(list[keys[index]], keys[index], list, result), list[keys[index]], keys[index], list, result);
					if(stoper && stoper(memo)) return memo;
				}
			}
			return result;
		};
	}

	function partial (fn) {
		let args = rest(arguments);
		return function() {
			let callArgs = arrayCopy(args);
			let newArgs = arrayCopy(arguments);
			let shiftArg = bind(shift(Array.prototype), newArgs);
			each(callArgs,If( value => value === partial._, (value, index, list) => list[index] = shiftArg()));
			return fn.apply(this, callArgs);
		}
	}

	function ignore (fn) {
		let args = rest(arguments);
		return function() {
			let newArgs = arrayCopy(arguments);
			let callArgs = constant([])();
			let shiftArg = bind(shift(Array.prototype), newArgs);
			let pushArg = bind(push(Array.prototype), callArgs);
			reduce(args,
				If( (result, value) => value === ignore._,
					result => { pushArg(shiftArg()); return result;},
					If( (result, value) => value === ignore.$,
						(result) => {  shiftArg(); return result;},
						(result, value) => { pushArg(value); return result;}
						)
				), callArgs);
			return fn.apply(this, callArgs);
		};
	}

	function nameSpace (predicate) {
		let space = {};
		return function() {
			return predicate.apply(space, arguments);
		}
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
		'each' : each,
		'ignore' : ignore,
		'reduce' : reduce,
		'map' : map,
		'bind' : bind,
		'every' : every,
		'some' : some,
		'nameSpace' : nameSpace
	};
})();