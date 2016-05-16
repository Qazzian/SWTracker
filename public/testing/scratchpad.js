// TODO convert to ES6
define(function(require) {
	'use strict';

	var $ = require('jquery');

	if (window.scratchpad) {
		return window.scratchpad;
	}

	/**
	 * Separates the html created for tests from the Jasmine results.
	 * @param container
	 * @constructor
	 */
	var ScratchPad = function(container) {
		if (!container) {
			container = $('body');
		}

		this.$elmt = $('<div id="jasmine-scratchpad"/>');
		this.$templateContainer = $('<div id="templateContainer" />');
		container.append(this.$elmt, this.$templateContainer);
	};

	ScratchPad.prototype = {
		/** The container of added HTML fragments. Use this as a starting point for jQuery.find */
		$elmt: null,

		/** The templates container. Needed to keep templates scripts separate from the rest of the HTML **/
		$templateContainer: null,

		/**
		 * Add a DOM fragment to the Document. The function wraps the fragment in a jQuery first so this can be anything that jQuery can accept.
		 * @param domFragment
		 */
		add: function(domFragment) {
			this.$elmt.append($(domFragment));
		},

		/**
		 * Add a mustache template to the document.
		 * This accepts a string and will wrap it in a script tag before adding it so you just need the inside of the tempalte.
		 * Designed to work with the mustache files that spec/util.js produce
		 * @param templateID {string} - This should match the template ID that's defined in the JSP which can will use to find the template.
		 * @param templateString {string} - The contents of the template
		 * @returns {*|jQuery|HTMLElement} - A handle on the created script element.
		 */
		addTemplate: function(templateID, templateString) {
			var $scriptTag = $('<script id="' + templateID + '" type="text/mustache"></script>');
			$scriptTag[0].textContent = templateString;
			this.$templateContainer.append($scriptTag);
			return $scriptTag;
		},

		/**
		 * Add a number of templates to the dom.
		 * @param {object} templateMap - a number of templates in the form {{string}templateID: {string}templateString}.
		 */
		addTemplates: function(templateMap) {
			var self = this;
			$.each(templateMap, function(key, template) {
				self.addTemplate(key, template);
			});
		},

		/**
		 * Uses the jQuery find function to find an element that's been added to the scratchpad.
		 * This will not look in templates.
		 * @param selector
		 */
		find: function(selector) {
			return this.$elmt.find(selector);
		},

		/**
		 * Clear the contents of the scratch pad areas (html and templates) ready for the next tests
		 */
		clear: function() {
			this.$elmt.empty();
			this.$templateContainer.empty();
		},

		/**
		 * Remove the scratch pad from the DOM
		 */
		remove: function() {
			this.$elmt.remove();
			this.$templateContainer.remove();
		}
	};

	// Because I keep forgetting which one to use.
	ScratchPad.prototype.clean = ScratchPad.prototype.clear;

	window.scratchpad = new ScratchPad();

	return window.scratchpad;
});
