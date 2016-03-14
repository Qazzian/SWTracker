/**
 * Created by ianwallis on 14/09/2015.
 */

'use strict';

import 'sass/styles.scss!';
import './_page_today.scss!';

// External libraries
import {default as can} from 'can';
import {default as stache} from 'can/dist/cjs/view/stache/stache';
//import {default as mustache} from 'mustache';
import {default as _} from 'lodash';

// Components
import {default as TotalsComp} from 'components/todaysTotals/totals.js';
import {default as PlanSelector} from 'components/planSelector/planSelector.js';
import {default as FoodTable} from 'components/foodtable/foodTable.js';

// Some global data
import {default as UserData} from 'models/UserData.js';
import {default as SW_PLANS} from 'models/SlimmingWorldPlans.js';

import pageTemplate from './today.mustache!text';



try {

	var FOOD_CATEGORIES = ['SYNS', 'HOA', 'HOB', 'FREE'];

	var userData = new UserData();

	var renderPage = can.stache(pageTemplate);

	function TodayPageController() {
		var self = this;

		//this.totalsView = new TodaysTotals();
		//this.planSelector = new PlanSelector();

		//this.initDeps = function() {
		//	return Promise.all([
		//		//self.totalsView.init(),
		//		//self.planSelector.init()
		//	]);
		//};

		this.onReady = function() {

			//var planModel = {
			//	options: []
			//};
			//
			//_.each(SW_PLANS, function(value) {
			//	var plan = _.clone(value);
			//	if(plan.id === userData.planType) {
			//		plan.selected = true;
			//	}
			//	planModel.options.push(plan);
			//});

			//self.initDeps().then(function() {
			var $pageContentArea = $('#main');
			var pageContent = renderPage(userData);
			$pageContentArea.html(pageContent);

				//$pageHtml.find('.swt-plan-type-section').replaceWith(self.planSelector.render(planModel));
			//});
		};
	}

	$(document).ready(function() {
		var controller = new TodayPageController();
		controller.onReady();
	});

}
catch (err) {
	console.error(err);
	debugger;
}
