/**
 * Created by ianwallis on 16/10/2015.
 */

/*global Promise, System*/

define(function(require) {
	'use strict';

	var mustache = require('mustache');

	function TodaysTotalsView() {
		var self = this;

		this.init = function() {
			this.initPromise = Promise.all([
				System.import('js/components/todaysTotals/totals.mustache!text')
			]);

			this.initPromise.then(function(deps) {
				// Deps = [totals.mustache, totals.css]
				if(deps && deps.length === 2) {
					self.template = deps[0];
					mustache.parse(self.template);
				}
			});

			return this.initPromise;
		};

		this.render = function(data) {
			return mustache.render(this.template, data);
		};

	}

	return TodaysTotalsView;

});