
'use strict';

import {default as can} from 'can';

import template from './foodTable.mustache!text';
import './_foodTable.scss!';

var TodaysTotalsView = can.Component.extend({
	tag: 'foodTable',
	template: can.stache(template),
	viewModel: can.Map({
		foodItems: []
	})
});