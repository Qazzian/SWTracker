/**
 * Created by ianwallis on 16/12/2015.
 */


define(function() {
	'use strict';

	function FoodItem(category, description, amount, syns){
		this.category = category || 'SYNS';
		this.description = description || 'Added food: ' + this.category;
		this.amount = amount || 0;
		this.syns = syns || 0;
	}

	// TODO Make this an observable (knockout?)

	function UserData() {
		this.totals = {
			syns: 15,
			hoa: 1,
			hob: 0
		};

		this.planType = 'plan_green';

		this.foodItems = [
			new FoodItem('HOA', 'Example Healthy Option A', '20g', 0),
			new FoodItem('HOB', 'Example Halthy Option B', 10, 0),
			new FoodItem('FREE', 'Free food, fruit etc', 1, 0),
			new FoodItem('SYN', 'Synfull food, cake', '1 Slice', 3)
		];
	}

	return UserData;
});

