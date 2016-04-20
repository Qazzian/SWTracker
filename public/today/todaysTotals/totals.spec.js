'use strict';

import {default as totals} from './totals';

var data = {
	syns: 15,
	hoa: 1,
	hob: 0
};

describe('totals', () => {

	it('should be defined', function() {
		expect(true).toBe(true);
		expect(totals).toBeDefined();
	});

	it('should render correctly', function(done) {
	    var instance = new totals(data);
		// exp
	    done();
	});
});

