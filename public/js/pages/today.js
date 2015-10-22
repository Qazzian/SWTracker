/**
 * Created by ianwallis on 14/09/2015.
 */

define(function(require){
	'use strict';

	var _ = require('lodash'),
		$ = require('jquery'),
		mustache = require('mustache');

	// Some global data
	var SW_PLANS = {
		RED: {
			name: 'Red',
			synLimit: 20,
			hoaLimit: 1,
			hobLimit: 1
		},
		GREEN: {
			name: 'Green',
			synLimit: 20,
			hoaLimit: 1,
			hobLimit: 1
		},
		EXTRA_EASY: {
			name: 'Extra Easy',
			synLimit: 20,
			hoaLimit: 1,
			hobLimit: 1
		},
		EXTRA_EASY_SPEEDY: {
			name: 'Extra Easy Speedy',
			synLimit: 20,
			hoaLimit: 1,
			hobLimit: 1
		}
	};

	var FOOD_CATEGORIES = ['SYNS', 'HOA', 'HOB', 'FREE'];

	var templates = {
		totals: $('.totals').html(),
		planTypes: $('.swt-plan-type-section').html(),
		foodList: $('.swt-food-list-section').html()
	};

	// example data

	var userData = {
		totals: {
			syns: 15,
			hoa: 1,
			hob: 0
		},
		planType: 'RED',

		foodItems: [
			new FoodItem('HOA', 'Example Healthy Option A', '20g', 0),
			new FoodItem('HOB', 'Example Halthy Option B', 10, 0)
		]
	};

	function FoodItem(category, description, amount, syns){
		this.category = category || 'SYNS';
		this.description = description || 'Added food: ' + this.category;
		this.amount = amount || 0;
		this.syns = syns || 0;
	}

	$(document).ready(function(){
		var renderedTotals = mustache.render(templates.totals, userData.totals);
		$('.totals').html(renderedTotals);
	});

	return {
		SW_PLANS: SW_PLANS,
		FOOD_CATEGORIES: FOOD_CATEGORIES,
		FoodItem: FoodItem
	};

});
