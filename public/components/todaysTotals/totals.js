/**
 * Created by ianwallis on 16/10/2015.
 */

/*global Promise, System*/

define(function(require) {
	'use strict';

	var mustache = require('mustache');
	var can = require('can');

	function TodaysTotalsView() {
		var self = this;

		console.info("ARGS: ", arguments);
		this.init = function() {
			this.initPromise = Promise.all([
				System.import('components/todaysTotals/totals.mustache!text')
			]);

			this.initPromise.then(function(deps) {
				// Deps = [totals.mustache, totals.css]
				if(deps) {
					self.template = deps[0];
					mustache.parse(self.template);
				}
			});

			return this.initPromise;
		};

		/**
		 * Returns the completed totals HTML
		 *
		 * @param data {Object}
		 * @param data.hoa {Number} - Number of Healthy option A portions.
		 * @param data.hob {Number}} - Number of Healthy option B portions.
		 * @param data.syns {Number} - Number of Syns consumed.
		 * @return {string} - The html representing the totals data.
		 */
		this.render = function(data) {
			return mustache.render(this.template, data);
		};

	}

	return TodaysTotalsView;

});