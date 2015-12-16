/**
 * Created by ianwallis on 15/12/2015.
 */

define(function(require){

	var _ = require('lodash'),
		$ = require('jquery'),
		mustache = require('mustache');

	function PlanSelector(){

		var self = this;
		var initPromise = null;

		this.template = null;

		this.init = function(){
			initPromise = System.import('components/planselector/planSelector.mustache!text').then(function(deps){
				self.template = deps;
				mustache.parse(self.template);
			});

			return initPromise;
		};

		this.render = function(planData) {
			return mustache.render(this.template, planData);
		};

	}

	return PlanSelector;

});