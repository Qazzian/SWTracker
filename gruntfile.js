
module.exports = function(grunt) {

	//var Log = require('grunt-legacy-log').Log;
	//var logger = new Log({grunt: grunt});
	//grunt.log = logger.writeln;


	grunt.log.writeln('Adding config');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			dev: {
				dest: 'public/',
				js_dest: 'public/js/lib',
				css_dest: 'public/sass/lib'
			}
		},
		compass: {
			options: {
				config: 'compassConfig.rb'
			},
			dev: {
				options: {
					environment: 'development',
					"output-style": 'nested',
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
					'public/**/*.html'
				]
			}
		},
		jshint: {
			options: {

			},
			all: [
				'gruntfile.js',
				'public/js/**/*.js',
				'!public/js/lib/**/*.js'
			]

		},
		requirejs: {
			// TODO
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
				interrupt: true
			},
			html: {
				files: [
					'public/**/*.html',
					'.htmllintrc'
				],
				tasks: ['htmlTasks']
			},
			scripts: {
				files: [
					'public/js/**/*.js',
					'!public/js/lib/**/*.js',
					'.jshintrc',
					'bower.json'

				],
				tasks: ['scriptTasks']
			},
			styles: {
				files: [
					'public/sass/**/*.scss',
					'.scss-lint.yml',
					'compassConfig.rb'
				],
				tasks: ['styleTasks']
			}
		}

	});


	// Custom tasks.
	grunt.registerTask('default', 'Alias for allTasks.', ['allTasks']);
	grunt.registerTask('doWatch', 'Run allTasks then watch for changes.', ['allTasks', 'watch']);

	grunt.registerTask('allTasks', 'Run all the tasks.', ['htmlTasks', 'scriptTasks', 'styleTasks']);
	grunt.registerTask('htmlTasks', 'run all html related tasks.', ['htmllint']);
	grunt.registerTask('scriptTasks', 'run all js related tasks.', ['jshint']);
	grunt.registerTask('styleTasks', 'run all scss and css related tasks.\n', ['compass:dev', 'scsslint']);

	// Load plugins.
	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-htmllint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-scss-lint');
	grunt.loadNpmTasks('grunt-contrib-watch');



};