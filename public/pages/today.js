/**
 * Created by ianwallis on 14/09/2015.
 */

define(function(require){
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery'),
		mustache = require('mustache');

	var TodaysTotals = require('components/todaysTotals/totals.js');
	var PlanSelector = require('components/planSelector/planSelector.js');

	var UserData = require('models/UserData.js');

	// Some global data
	var SW_PLANS = require('models/SlimmingWorldPlans.js');

	var FOOD_CATEGORIES = ['SYNS', 'HOA', 'HOB', 'FREE'];

	var userData = new UserData();

	function TodayPageController(){
		var self = this;

		this.totalsView = new TodaysTotals();
		this.planSelector = new PlanSelector();

		this.initDeps = function() {
			return Promise.all([
				self.totalsView.init(),
				self.planSelector.init()
			]);
		};

		this.onReady = function(){

			var planModel = {
				options: []
			};

			_.each(SW_PLANS, function(value){
				var plan = _.clone(value);
				if (plan.id === userData.planType) {
					plan.selected = true;
				}
				planModel.options.push(plan);
			});

			self.initDeps().then(function(){
				$('.totals').replaceWith(self.totalsView.render(userData.totals));
				$('.swt-plan-type-section').replaceWith(self.planSelector.render(planModel));
			});
		};
	}

	$(document).ready(function(){
		var controller = new TodayPageController();
		controller.onReady();
	});

	return TodayPageController;

});
