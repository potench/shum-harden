Red-optimized HTML5 Boilerplate [http://html5boilerplate.com](http://html5boilerplate.com)
==========================================================================================

## Includes

- H5BP-friendly [base.html template](project/templates/base.html)
- [Holmes CSS Debugger](http://www.red-root.com/sandbox/holmes/)
- Modernizr/jQuery
- [Rosy](/ff0000/rosy)
- [Compass](/ff0000/red-compass-framework)
- Lots of development & build tools (see below)

Front-end build tools
=====================

## Requirements

- [Ruby](http://www.ruby-lang.org/en/)
	- OS X: Pre-installed
	- Ubuntu: `sudo apt-get install ruby`
- [RubyGems](http://rubygems.org/)
	- OS X: Pre-installed
	- Ubuntu: `sudo apt-get install rubygems`
- [Bundler](http://gembundler.com/)
	- `gem install bundler`
- [Java](http://www.java.com/en/download/index.jsp)
	- OS X: Pre-installed
	- Ubuntu: [via Software Center](apt://openjdk-6-jre)

## Setup

    cd legendary_comicon/trunk
    bundle install

## Rake tasks

#### Create a new Rosy page
	$ rake create:page

#### Update a subversion repository over git
	$ rake dev:gitsvn

#### JSHint your JavaScript
	$ rake dev:jshint

#### Setup Terminitor Project (OS X)
	$ rake mac:setup:terminitor

#### Watch for JavaScript changes to compress output
	$ rake watch:closure

#### Watch for CSS changes to generate SASS
	$ rake watch:compass

#### Watch for JavaScript changes to JSHint your files
	$ rake watch:jshint
