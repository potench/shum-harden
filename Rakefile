require "rubygems"
require "bundler/setup"

PROJECT_ROOT = File.expand_path(File.dirname(__FILE__))
STATIC_DIR = File.join("project", "static")
RESOURCE_DIR = File.join("resources")
TASKS_DIR = File.join(RESOURCE_DIR, "tasks")
CONFIG_DIR = File.join(TASKS_DIR, "config")

namespace :watch do
  desc "Watch for CSS changes to generate SASS"
  task :compass do
    require "resources/tasks/compass-watcher"
    watch_compass
  end
  
  desc "Watch for JavaScript changes to compress output"
  task :closure do
    require "resources/tasks/closure-watcher"
    watch_closure
  end
  
  desc "Watch for JavaScript changes to JSHint your files"
  task :jshint do
    require "resources/tasks/jshint-watcher"
    watch_jshint
  end
end

namespace :dev do
  desc "JSHint your JavaScript"
  task :jshint do
    require "resources/tasks/jshint"
    jshint
  end
end

namespace :update do
  desc "Update a subversion repository over git"
  task :git do
    require "resources/tasks/update-git-svn"
    update_git
  end
end

namespace :create do
  desc "Create a new Rosy page"
  task :page do
    require "resources/tasks/setup-page"
    create_page
  end
end

namespace :mac do
  namespace :setup do
    desc "Setup Terminitor Project (OS X)"
    task :terminitor do
      require "resources/tasks/setup-terminitor"
      setup_terminitor
    end
  end
end
