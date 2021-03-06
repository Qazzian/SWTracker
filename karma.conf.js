/* global module */
module.exports = function(config) {
	'use strict';
	config.set({
		autoWatch: true,
		singleRun: false,

		// logLevel: config.LOG_DEBUG,

		basePath: '',

		frameworks: ['jspm', 'jasmine'],

		files: [
			'node_modules/babel-polyfill/dist/polyfill.js'
		],

		jspm: {
			config: './public/jspmConfig.js',
			loadFiles: [
				'./public/today/**/*.spec.js',
				'./public/models/**/*.spec.js'
			],
			serveFiles: [
				'./public/**/*'
			]
		},

		proxies: {
			'/public/': '/base/public/',
			'/sass/': '/base/public/sass/',
			'/jspm_packages/': '/base/public/jspm_packages/'
		},

		browsers: [
			'Chrome',
			'PhantomJS'
		],

		preprocessors: {
			'public/(models|today|testing)/*.js': ['babel', 'sourcemap', 'coverage']
		},

		babelPreprocessor: {
			options: {
				sourceMap: 'inline'
			},
			sourceFileName: function(file) {
				return file.originalPath;
			}
		},

		reporters: ['coverage', 'progress'],

		coverageReporter: {
			instrumenters: {isparta: require('isparta')},
			instrumenter: {
				'public/**/*.js': 'isparta'
			},

			reporters: [
				{
					type: 'text-summary',
					subdir: normalizationBrowserName
				},
				{
					type: 'html',
					dir: 'coverage/',
					subdir: normalizationBrowserName
				}
			]
		}
	});

	function normalizationBrowserName(browser) {
		return browser.toLowerCase().split(/[ /-]/)[0];
	}
};