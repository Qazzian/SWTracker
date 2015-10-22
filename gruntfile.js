

module.exports = function(grunt) {
	'use strict';

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
		jscs: {
			options: {

			},
			all: jsFiles
		},
		jshint: {
			options: {

			},
			all: jsFiles

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
					'public/**/*.html',
					'!public/jspm_packages/**/*',
					'.htmllintrc'
				],
				tasks: ['htmlTasks']
			},
			scripts: {
				files: [
					'public/js/**/*.js',
					'!public/jspm_packages/**/*',
					'.jshintrc'
				],
				tasks: ['scriptTasks']
			},
			styles: {
				files: [
					'public/sass/**/*.scss',
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

	grunt.registerTask('allTasks', 'Run all the tasks.', ['htmlTasks', 'scriptTasks', 'styleTasks']);
	grunt.registerTask('htmlTasks', 'run all html related tasks.', ['htmllint']);
	grunt.registerTask('scriptTasks', 'run all js related tasks.', ['jshint', 'jscs']);
	grunt.registerTask('styleTasks', 'run all scss and css related tasks.\n', ['compass:dev', 'scsslint']);

	// Load plugins.
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-htmllint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-scss-lint');

};