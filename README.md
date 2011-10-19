Red-optimized HTML5 Boilerplate [http://html5boilerplate.com](http://html5boilerplate.com)
==========================================================================================

## Includes

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

#### via git-svn

    cd path/to/trunk
    git remote add --fetch --no-tags --track master boilerplate git://github.com/ff0000/red-boilerplate.git && git pull boilerplate master
    git svn rebase -s ours && git pull boilerplate master

Updating the RBP
================

It is recommended you keep your boilerplate up-to-date. The RBP is actively maintained and keeps a close eye on the master HTML5 boilerlplate. Run the following command to update:

    rake dev:update

Front-end build tools
=====================

## Requirements

- [Ruby <= 1.8.7](http://www.ruby-lang.org/en/)
	- OS X: Pre-installed
	- Ubuntu: `sudo apt-get install ruby`
- [RubyGems <= 1.6.2](http://rubygems.org/)
	- OS X: `sudo gem update --system`
	- Ubuntu: `sudo apt-get install rubygems`
- [Bundler](http://gembundler.com/)
	- `gem install bundler`
- [Java](http://www.java.com/en/download/index.jsp)
	- OS X: Pre-installed
	- Ubuntu: `sudo apt-get install openjdk-6-jre`

## Optional

- [RVM](http://beginrescueend.com/)
	- RVM is a command-line tool which allows you to easily install, manage and work with multiple ruby environments, from interpreters to sets of gems.
	- `bash < <(curl -s https://rvm.beginrescueend.com/install/rvm)`

## Setup

    gem install bundler && bundle install

## Rake tasks

#### See all available tasks
	$ rake -T

#### Create a new Rosy page
	$ rake create:page

#### JSHint your JavaScript
	$ rake dev:jshint

#### Update the Red Boilerplate
	$ rake dev:update

#### Watch for application changes to update the application cache
	$ rake watch:appcache

#### Watch for JavaScript changes to compress output
	$ rake watch:closure

#### Watch for CSS changes to generate SASS
	$ rake watch:compass

#### Watch for JavaScript changes to JSHint your files
	$ rake watch:jshint

License
=======

### Major components:

* jQuery: MIT/GPL license
* Modernizr: MIT/BSD license
* Respond.js: MIT/GPL license
* Normalize.css: Public Domain

### Everything else:

The Unlicense (aka: public domain)

### RED Interactive

Code modified by RED under the [MIT license](LICENSE.txt).