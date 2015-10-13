# Slimming World Syn Tracker

This is a simple web app to help you track your daily Syns and healthy options.


## Development Requirements

To build this from source you will first need to download and install the following dependencies:
- [node and npm](http://nodejs.org)
- grunt-cli
	`npm install -g grunt-cli`
- ruby
- ruby gem
- ruby bundler


## Building from source

1. Install the dependencies (above)
1. Clone the git repository on to your machine
1. Move into the project root (`cd SWTracker` if you use GIT's suggested default directory)
1. run `npm install`
    - This will download all required node modules for development, trigger an install of the required Ruby libraries defined in Gemfile.lock and then run the default grunt task.

## Running the app

There isn't any server side code yet so you will need to find another solution for now. I use http-server
- `npm install http-server -g`
- `http-server ./public`
- in a web browser go to http://localhost:8080


## Grunt tasks

In most cases you will want to run the default task for a one off build or `doWatch`, which will run all the tasks and then watch for file changes, running the appropriate tasks on the fly. For a full list of available tasks run `grunt --help` in the project root.

