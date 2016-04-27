/* jshint node: true */
/* globals require */

'use strict';

var fs = require('fs');
var exec = require('child_process').exec;

var mustache = require('mustache');

// Scripts to include in the html file
var HTML_SCRIPTS = {
	DEV: [
		'jspm_packages/system.js',
		'jspmConfig.js',
		'init.js'
	],
	PROD: [
		'today.min.js'
	]
};

module.exports = function(grunt) {

	var jsFiles = [
		'gruntfile.js',
		'public/js/**/*.js',
		'!public/js/lib/**/*.js',
		'!public/jspm_packages/**/*'
	];

	//var Log = require('grunt-legacy-log').Log;
	//var logger = new Log({grunt: grunt});
	//grunt.log = logger.writeln;

	grunt.log.writeln('Adding config');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
			options: {
				config: 'compassConfig.rb'
			},
			dev: {
				options: {
					environment: 'development',
					'output-style': 'nested',
					sourcemap: true
				}
			},
			prod: {
				options: {
					environment: 'production'
				}
			}
		},
		htmllint: {
			dev: {
				options: {
					htmllintrc: './.htmllintrc'
				},
				src: [
					'public/**/*.html',
					'!public/jspm_packages/**/*'
				]
			}
		},
		jasmine: {
		},
		jscs: {
			options: {},
			all: jsFiles
		},
		jshint: {
			options: {},
			all: jsFiles

		},
		jspm: {
			dev: {
				options: {
					sfx: true,
					mangle: false,
					minify: false,
					sourceMaps: true
				},
				files: {
					'./public-build/today.min.js': 'public/today/today.js'
				}
			},
			prod: {
				options: {
					sfx: true,
					mangle: true,
					minify: true,
					sourceMaps: false
				},
				files: {
					'./public-build/today.min.js': 'public/today/today.js'
				}
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		scsslint: {
			allFiles: [
				'public/sass/**/*.scss',
				'!public/sass/lib/**/*.scss'
			],
			options: {
				config: '.scss-lint.yml',
				colorizeOutput: true
			}
		},
		watch: {
			options: {
				atBegin: true,
				interrupt: true
			},
			grunt: {
				files: [
					'gruntfile.js'
				],
				tasks: []
			},
			html: {
				files: [
					'public/index.mustache',
					'.htmllintrc'
				],
				tasks: ['htmlTasks']
			},
			scripts: {
				files: [
					'public/**/*.js',
					'public/**/*.mustache',
					'!public/jspm_packages/**/*',
					'.jshintrc'
				],
				tasks: ['scriptTasks']
			},
			styles: {
				files: [
					'public/**/*.scss',
					'!public/jspm_packages/**/*',
					'.scss-lint.yml',
					'compassConfig.rb'
				],
				tasks: ['styleTasks']
			}
		}
	});

	// Custom tasks.
	grunt.registerTask('default', 'Alias for allTasks.', ['allTasks']);

	grunt.registerTask('build', 'build for production environment.',
		['clean', 'jspm:prod', 'build-html:prod']);
	grunt.registerTask('build-dev', 'build with debugger settings & source maps.',
		['clean', 'jspm:dev', 'build-html:prod']);
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('allTasks', 'Lint and build the html, css and js.', ['htmlTasks', 'scriptTasks', 'styleTasks']);
	grunt.registerTask('htmlTasks', 'run all html related tasks.', ['htmllint', 'build-html:dev', 'build-html:prod']);
	grunt.registerTask('scriptTasks', 'run all js related tasks.', ['karma', 'jshint', 'jscs', 'jspm:dev']);
	grunt.registerTask('styleTasks', 'run all scss and css related tasks.', ['compass:dev', 'scsslint', 'jspm:dev']);
	grunt.registerTask('test', 'Run all the tests.\n', function() {
		console.info('TODO');
	});

	// Load plugins.
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-htmllint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-jspm');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-scss-lint');

	grunt.registerTask('clean', 'Remove the build directory', function() {

		function puts(error, stdout, stderr) {
			console.error(error);
			console.error(stderr);
			console.log(stdout);
		}

		exec('rm -rf public-build', puts);
	});

	function renderIndexTemplate(output, scripts) {
		var template = fs.readFileSync('public/index.mustache', 'utf8');
		var html = mustache.render(template, {scripts: scripts});
		fs.writeFileSync(output, html, 'utf8');
	}

	grunt.registerTask('build-html:dev', 'Create the index.html file for development', function() {
		renderIndexTemplate('public/index.html', HTML_SCRIPTS.DEV);
	});

	grunt.registerTask('build-html:prod', 'Create the index.html file for development', function() {
		var buildDir = './public-build';
		var stats;

		try {
			stats = fs.statSync(buildDir);
		} catch(err) {
			fs.mkdirSync(buildDir);
		}

		renderIndexTemplate('public-build/index.html', HTML_SCRIPTS.PROD);
	});

};