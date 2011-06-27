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

#### Note: This assumes you've checked out the project via git-svn

    cd path/to/trunk
    git remote add -f boilerplate git://github.com/ff0000/red-boilerplate.git && git pull boilerplate master
    git svn rebase -s ours && git pull boilerplate master

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
	- Ubuntu: `sudo apt-get install openjdk-6-jre`

## Setup

    cd path/to/trunk
    bundle install

## Rake tasks

#### See all available tasks
	$ rake -T

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
