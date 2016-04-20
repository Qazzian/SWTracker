'use strict';

import 'sass/styles.scss!';
import './_page_today.scss!';

// External libraries
import {default as can} from 'can';
import {default as stache} from 'can/dist/cjs/view/stache/stache';

// Components
import {default as TotalsComp} from './todaysTotals/totals.js';
import {default as PlanSelector} from './planSelector/planSelector.js';
import {default as FoodTable} from './foodtable/foodTable.js';

// Some global data
import {default as UserData} from 'models/UserData.js';
import {default as SW_PLANS} from 'models/SlimmingWorldPlans.js';

import pageTemplate from './today.mustache!text';

var FOOD_CATEGORIES = ['SYNS', 'HOA', 'HOB', 'FREE'];
var userData = new UserData();
var renderPage = can.stache(pageTemplate);

export default function TodayPageController() {

	this.onReady = function() {
		var $pageContentArea = $('#main');
		var pageContent = renderPage(userData);
		$pageContentArea.html(pageContent);
	};
}

$(document).ready(function() {
	var controller = new TodayPageController();
	controller.onReady();
});
