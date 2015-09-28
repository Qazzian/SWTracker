
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
			// TODO
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
				files: ['public/**/*.html'],
				tasks: ['htmlTasks']
			},
			scripts: {
				files: ['public/js'],
				tasks: ['scriptTasks']
			},
			styles: {
				files: ['public/sass/**/*.scss'],
				tasks: ['styleTasks']
			}
		}

	});

	// Load plugins.
	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-htmllint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-scss-lint');
	grunt.loadNpmTasks('grunt-contrib-watch');


	// Custom tasks.
	grunt.registerTask('default', ['allTasks']);
	//grunt.registerTask('prod', ['bower:dev', 'compass:prod']);
	//grunt.registerTask('dev', ['bower:dev', 'compass:dev']);
	grunt.registerTask('doWatch', ['allTasks', 'watch']);

	grunt.registerTask('allTasks', ['htmlTasks', 'scriptTasks', 'styleTasks']);
	grunt.registerTask('htmlTasks', ['htmllint']);
	grunt.registerTask('scriptTasks', ['jshint']);
	grunt.registerTask('styleTasks', ['compass:dev', 'scsslint']);


};