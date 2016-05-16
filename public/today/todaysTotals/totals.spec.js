'use strict';

import {default as $} from 'jquery';
import {default as can} from 'can';
import {default as Totals} from './totals';

import {default as scratchpad} from 'testing/scratchpad';

var data = {
	syns: 15,
	hoa: 1,
	hob: 0
};

var componentWrapper = '<div id="totalsWrapper"><todaysTotals></todaysTotals></div>';

describe('totals', () => {

	beforeEach(function() {
		scratchpad.add(componentWrapper);
	});

	it('should be defined', function() {
		expect(true).toBe(true);
		expect(Totals).toBeDefined();
	});

	it('should render correctly', function(done) {
		can.view('totalsWrapper');
		var $totalSection = $('section.totals');
		expect($totalSection.length).toBeGreaterThan(0);
		done();
	});
});

