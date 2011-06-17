require "rubygems"
require "bundler/setup"
require "fssm"
require "json"
require "zlib"
require "term/ansicolor"

PROJECT_ROOT = File.expand_path(File.dirname(__FILE__))
STATIC_DIR = File.join("project", "static")
COMPASS_DIR = File.join("resources", "compass")

include Term::ANSIColor

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

    
    SETUP_JSON = File.join("resources", "fssm", "setup.json")
    @json = JSON.parse(File.read(SETUP_JSON))
    
    puts ">>> Polling for JavaScript changes. Press Ctrl-C to Stop"
    
    FSSM.monitor do
      path PROJECT_ROOT do
        glob "**/*.{js,json}"

        update do |base, relative|
          match = relative.sub(STATIC_DIR + "/", "")
          
          # More expensive, but allows for live editing of JSON file
          @json = JSON.parse(File.read(SETUP_JSON)) if match.eql?(SETUP_JSON)
          
          @json.each_pair do |key, group|
            source = group["source"]
            output = group["output"]
            
            if match.eql?(SETUP_JSON) or source.include?(match)
              puts ">>> Change detected to: #{relative}"
              code = String.new

              source.each do |file|
                current = File.join(STATIC_DIR, file)
                
                if File.exists?(current)
                  code += File.read(current)
                else
                  puts "    #{red("missing")} #{file}"
                end
              end

              begin
                closure = Closure::Compiler.new.compile(code)
              rescue Closure::Error => error
                p "    #{red("error")} #{error}"
              end
              
              output_file = File.join(STATIC_DIR, output)
              output_file_exists = File.exists?(output_file)
              existing = File.read(output_file) if File.exists?(output_file)
              
              if (closure.eql?(existing))
                puts "#{green("identical")} #{output}"
              else
                File.open(output_file, "w") do |f|
                  f.write(closure)

                  gzip = Zlib::Deflate.new
                  deflate = gzip.deflate(closure)
                  gzip.close

                  output_str = " #{output} #{yellow(">>>")} #{cyan("#{filesize(closure.size)} (#{filesize(deflate.size)} gzip)")}"
                  
                  if (output_file_exists)
                    puts "#{yellow("overwrite")} #{output_str}"
                  else
                    puts "#{green("create")} #{output_str}"
                  end
                end unless closure.nil?
              end
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
  suffix = 'b'
  labels = {
      0 => ['kb', 'mb'],
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
  
  size.to_s + suffix
end
