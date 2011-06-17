require "rubygems"
require "bundler/setup"
require "fssm"
require "json"
require "zlib"

PROJECT_ROOT = File.expand_path(File.dirname(__FILE__))
STATIC_DIR = File.join("project", "static")
COMPASS_DIR = File.join("resources", "compass")
SETUP_JSON = JSON.parse(File.read(File.join("resources", "fssm", "setup.json")))

namespace :watch do
  desc "Watching for Compass changes"
  task :compass do
    require "sass"
    require "compass"
    
    system "bundle exec compass watch #{COMPASS_DIR}"
  end
  
  desc "Watching for JS Changes"
  task :js do
    require "closure-compiler"

    puts ">>> Polling for JavaScript changes. Press Ctrl-C to Stop"
    
    FSSM.monitor do
      path PROJECT_ROOT do
        glob "**/*.js"

        update do |base, relative|
          file = relative.sub(STATIC_DIR + "/", "")

          SETUP_JSON.each_pair do |key, group|
            source = group["source"]
            output = group["output"]
            
            if source.include?(file)
              puts "Change detected in #{relative}"
              code = String.new

              source.each do |file|
                if File.exists?(File.join(STATIC_DIR, file))
                  code += File.read(File.join(STATIC_DIR, file))
                else
                  puts "File does not exist! #{file}"
                end
              end

              begin
                closure = Closure::Compiler.new.compile(code)
              rescue Closure::Error => error
                p error
              end

              File.open(File.join(STATIC_DIR, output), "w") do |f|
                f.write(closure)
              end unless closure.nil?
              
              size = File.size(File.join(STATIC_DIR, output))
              puts "File size: #{filesize(size)}"
            end
          end
        end
      end
    end
  end
end

namespace :update do
  desc "Update local Git repository"
  task :git do
    out = %x[git diff-files]

    if out.empty?
      system "git svn rebase"
    else
      system "git stash save && git svn rebase && git stash apply"
    end
  end
end

namespace :setup do
  desc "Setup Terminitor Project"
  task :terminitor do
    require "terminitor"
    
    config = File.join(PROJECT_ROOT, ".config", "terminitor", "example.term")
    master = File.expand_path(File.join("~", ".config", "terminitor"))
    
    if File.exists?(config) and File.exists?(master)
      FileUtils.cp(config, master)
      puts "Done. You can start the project by running 'terminitor start example'"
    else
      p "No config file found" unless File.exists?(config)
      p "No master directory" unless File.exists?(master)
    end
  end
end

def filesize(bytes, label_style = 0)
  size = bytes
  suffix = 'Bytes'
  labels = {
      0 => ['KB', 'MB'],
      1 => ['Kilobytes', 'Megabytes'],
      2 => ['KiB', 'MiB']
    }
  sizes = [1024, 1048576, 1073741824]
  
  # KiB
  if size >= 1024
    size = (size / 1024).round
    suffix = labels[label_style][0]
  end

  # MiB
  if size >= 1024
    size = (size / 1024).round
    suffix = labels[label_style][1]
  end
  
  size.to_s + ' ' + suffix
end
