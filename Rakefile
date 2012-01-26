require "rubygems"
require "bundler/setup"

# Master class
module Rosy
  PROJECT_ROOT = File.expand_path(File.dirname(__FILE__))
  STATIC_DIR = File.join(PROJECT_ROOT, "project", "static")
  RESOURCE_DIR = File.join("resources")
  TASKS_DIR = File.join(PROJECT_ROOT, "resources", "tasks")
  CONFIG_DIR = File.join(TASKS_DIR, "config")
  
  # Module namespaces
  module Watch; end
  module Development; end
  module Create; end
  module Platform; end
end

# Require tasks
Dir.glob(File.join(Rosy::TASKS_DIR, "*.rb"), &method(:require))

namespace :watch do
  desc "All-in-one Uglify/Closure/JSHint/Compass watcher"
  task :all do
    Rosy::Watch::All.new.run ENV["nohint"]
  end
  
  desc "Watch for CSS changes to generate SASS"
  task :compass do
    Rosy::Watch::Compass.new.run
  end
  
  desc "Watch for JavaScript changes to compress output"
  task :uglify do
    Rosy::Watch::Uglify.new.run
  end
  
  desc "Watch for JavaScript changes to compress output"
  task :closure do
    Rosy::Watch::Closure.new.run
  end
  
  desc "Watch for JavaScript changes to JSHint your files"
  task :jshint do
    Rosy::Watch::JSHint.new.run
  end
  
  desc "Watch for application changes to update the application cache"
  task :appcache do
    Rosy::Watch::AppCache.new.run
  end
end

namespace :dev do
  desc "Install required gems via Bundler"
  task :bundler do
    Rosy::Development::Bundler.new.run
  end

  desc "Update the Red Boilerplate"
  task :update do
    Rosy::Development::Update.new.run
  end

  desc "Optimize Images"
  task :smush do
    Rosy::Development::Smush.new.run
  end

  desc "Build CSS w/ Compass"
  task :compass do
    Rosy::Development::Compass.new.run
  end

  desc "JSHint your JavaScript"
  task :jshint do
    Rosy::Development::JSHint.new.lint
  end

  desc "Closure Compile your JavaScript"
  task :closure do
    Rosy::Development::Closure.new.run
  end

  desc "Uglify your JavaScript"
  task :uglify do
    Rosy::Development::Uglify.new.run
  end

  desc "Final check to see if you've forgotten anything?"
  task :sanity do
    Rosy::Development::Sanity.new.run
  end

  desc "Build CSS w/ Compass, Run JSHint, Closure Compile your JavaScript"
  task :build => [:compass, :jshint, :sanity, :closure] do
    puts "All done building static files!"
  end
  
  desc "Build CSS w/ Compass, Run JSHint, Uglify your JavaScript"
  task :buildugly => [:compass, :jshint, :sanity, :uglify] do
    puts "All done building static files!"
  end
end

namespace :create do
  desc "Create a new Rosy page"
  task :page do
    Rosy::Create::Page.new.create
  end
end
