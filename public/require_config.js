/**
 * Created by ianwallis on 15/09/2015.
 */

requirejs.config({
	baseUrl: '/js',
	paths: {
		'jquery': 'lib/dist/jquery',
		'mustache': 'lib/mustache',
		'lodash': 'lib/lodash'
	},

	// TODO enter lib config here (maybe a grunt task could do it)
	shim: {
		'jquery': {exports: '$'},
		'lodash': { exports: '_'},
		'mustache': { exports: 'mustache'}
	}
});