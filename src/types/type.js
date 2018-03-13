'use strict';

class Type {
	constructor(..._interface) {
		this._inteface = _interface;
	}

	validator() {
		throw new Error('called non-init validator');
	}

	toString() {
		throw new Error('called non-init toString');
	}

	valueOf () {
		throw new Error('called non-init valueOf');
	}

	convert () {
		throw new Error('called non-init convert');
	}

	unwrap () {
		throw new Error('called non-init unwrap');
	}

	assignment () {
		throw new Error('called non-init assignment');
	}
}

module.exports = Type;