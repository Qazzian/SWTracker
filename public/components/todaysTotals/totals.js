/*global Promise, System*/

'use strict';

import {default as can} from 'can';

import template from './totals.mustache!text';
import './_totals.scss!';

try {
	var TodaysTotalsView = can.Component.extend({
		tag: 'todaysTotals',
		template: can.stache(template),
		viewModel: can.Map({
			hoa: 0,
			hob: 0,
			syns: 0
		})
	});
}
catch (err) {
	console.error(err);
	debugger;
}
/**
 * Daily totals view.
 * Needs the totals data passed to it
 *
 * @Tag todaysTotals
 * @param hoa {Number} - Number of Healthy option A portions.
 * @param hob {Number}} - Number of Healthy option B portions.
 * @param syns {Number} - Number of Syns consumed.
 */



export {TodaysTotalsView as default};