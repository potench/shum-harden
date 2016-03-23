# Shum-Harden Wedding Website
==============================

http://shum-harden.com

There's some fun tools used in this site that I'd like to document here, but there's seriously no time right now.  I promise to come back after launch is deemed successful to improve this documentation.

### Forthcoming Document Includes

- Some <canvas> utilities (js)
- google documents spreadsheet library (php)
- tracking and facebook utilities (js)

==============================
## Development Environment

- H5BP-friendly [base.html template](/ff0000/red-boilerplate/project/templates/base.html)
- [Holmes CSS Debugger](http://www.red-root.com/sandbox/holmes/)
- Modernizr/jQuery
- [Rosy](/ff0000/rosy)
- [Compass](/ff0000/red-compass-framework)
- Lots of development & build tools (see below)

Adding the RBP to your project
==============================

#### via git

    git remote add --fetch --no-tags --track master boilerplate git://github.com/ff0000/red-boilerplate.git && git pull boilerplate master

Front-end build tools
=====================

## Requirements

- [Ruby >= 1.8.7](http://www.ruby-lang.org/en/) (recommend 1.9.2)
	- OS X: Pre-installed
	- Ubuntu: `sudo apt-get install ruby`
- [RubyGems >= 1.6.2](http://rubygems.org/)
	- OS X: `sudo gem update --system`
	- Ubuntu: `sudo apt-get install rubygems`
- [Bundler](http://gembundler.com/)
	- `gem install bundler`

- [RVM](http://beginrescueend.com/)
	- RVM is a command-line tool which allows you to easily install, manage and work with multiple ruby environments, from interpreters to sets of gems.
	- `bash -s stable < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer)`
        - `rvm install 1.9.2`
        - `rvm use 1.9.2 --default`
        - `rvm rubygems latest`

- [Statix](https://github.com/gigafied/statix)

	- Statix will generate a completely static website into the `deploy` directory upon running `statix build` (once Statix is installed through npm) 
	Add pages, change vars, etc. all through the `statix.js` file
	   - Install [node.js](http://nodejs.org/)
	   - After node is installed run `npm install statix -g`
	   - From the root of the project run `statix build`
	   - To run a local webserver of the project run `statix server -p 8000`

## Setup

    gem install bundler
    bundle install --gemfile resources/tasks/config/Gemfile
    statix server -p 8000

## Rake tasks

Use `rake --tasks` for a list of available rake tasks

	rake create:page     # Create a new Rosy page
	rake dev:build       # Build CSS w/ Compass, Run JSHint, Closure Compile your JavaScript
	rake dev:buildugly   # Build CSS w/ Compass, Run JSHint, Uglify your JavaScript
	rake dev:closure     # Closure Compile your JavaScript
	rake dev:compass     # Build CSS w/ Compass
	rake dev:jshint      # JSHint your JavaScript
	rake dev:sanity      # Final check to see if you've forgotten anything?
	rake dev:smush       # Optimize Images
	rake dev:uglify      # Uglify your JavaScript
	rake dev:update      # Update the Red Boilerplate
	rake watch:appcache  # Watch for application changes to update the application cache
	rake watch:closure   # Watch for JavaScript changes to compress output
	rake watch:compass   # Watch for CSS changes to generate SASS
	rake watch:jshint    # Watch for JavaScript changes to JSHint your files
	rake watch:uglify    # Watch for JavaScript changes to compress output

License
=======

### Major components:

* jQuery: MIT/GPL license
* Modernizr: MIT/BSD license
* Respond.js: MIT/GPL license
* Normalize.css: Public Domain

### Everything else:

The Unlicense (aka: public domain)

