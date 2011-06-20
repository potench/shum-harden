require "rubygems"
require "bundler/setup"

# Master class
module Rosy
  PROJECT_ROOT = File.expand_path(File.dirname(__FILE__))
  STATIC_DIR = File.join("project", "static")
  RESOURCE_DIR = File.join("resources")
  TASKS_DIR = File.join(RESOURCE_DIR, "tasks")
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
  desc "Watch for CSS changes to generate SASS"
  task :compass do
    Rosy::Watch::Compass.new.run
  end
  
  desc "Watch for JavaScript changes to compress output"
  task :closure do
    Rosy::Watch::Closure.new.run
  end
  
  desc "Watch for JavaScript changes to JSHint your files"
  task :jshint do
    Rosy::Watch::JSHint.new.run
  end
end

namespace :dev do
  desc "JSHint your JavaScript"
  task :jshint do
    Rosy::Development::JSHint.new.lint
  end
  
  desc "Update a subversion repository over git"
  task :gitsvn do
    Rosy::Development::GitSVN.new.update
  end
end

namespace :create do
  desc "Create a new Rosy page"
  task :page do
    Rosy::Create::Page.new.create
  end
end

namespace :mac do
  namespace :setup do
    desc "Setup Terminitor Project (OS X)"
    task :terminitor do
      Rosy::Platform::Terminitor.new.setup
    end
  end
end
