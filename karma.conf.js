/* global module */
module.exports = function(config) {
	'use strict';
	config.set({
		autoWatch: true,
		singleRun: true,

		// logLevel: config.LOG_DEBUG,

		basePath: '',

		frameworks: ['jspm', 'jasmine'],

		files: [
			'node_modules/babel-polyfill/dist/polyfill.js'
		],

		jspm: {
			config: './public/jspmConfig.js',
			loadFiles: [
				'./public/components/**/*.spec.js',
				'./public/models/**/*.spec.js',
				'./public/pages/**/*.spec.js'
			],
			serveFiles: [
				'./public/components/**/*',
				'./public/models/**/*',
				'./public/pages/**/*',
				'./public/sass/**/*'
			]
		},

		proxies: {
			'/public/': '/base/public/',
			'/sass/': '/base/public/sass/',
			'/jspm_packages/': '/base/public/jspm_packages/'
		},

		browsers: [
			'Chrome'
			, 'PhantomJS'
		],

		preprocessors: {
			'public/!(*spec).js': ['babel', 'sourcemap', 'coverage']
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
				'src/*.js': 'isparta'
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