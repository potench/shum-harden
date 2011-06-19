require "fssm"
require "json"
require "zlib"
require "term/ansicolor"
require "closure-compiler"

SETUP_JSON = File.join(CONFIG_DIR, "setup.json")

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

def compile_js(relative = nil)
  match = relative.sub(STATIC_DIR + "/", "") unless relative.nil?

  # More expensive, but allows for live editing of JSON file
  $json = JSON.parse(File.read(SETUP_JSON)) if $json.nil? or match.eql?(SETUP_JSON)

  # Setup a cache of compiled assets
  $compiled = Hash.new if $compiled.nil?

  $json.each_pair do |key, group|
    source = group["source"]
    output = group["output"]

    if match.eql?(SETUP_JSON) or source.include?(match) or relative.nil?
      puts ">>> #{(relative.nil? || match.eql?(SETUP_JSON)) ? "Compiling" : "Change detected to: #{relative} in"} group \"#{key}\""
      
      code = String.new

      begin
        source.each do |file|
          current = File.join(STATIC_DIR, file)

          if File.exists?(current)
            if file.eql?(match) or $compiled[file].nil?
              puts "    #{cyan("compile")} #{file}"
              $compiled[file] = Closure::Compiler.new.compile(File.read(current))
            end

            code << $compiled[file]
          else
            puts "    #{red("missing")} #{file}"
          end
        end
      rescue Closure::Error => error
        puts "    #{red("error:")}"
        puts error
        break
      else
        output_file = File.join(STATIC_DIR, output)
        output_file_exists = File.exists?(output_file)
        existing = File.read(output_file) if output_file_exists

        if code.eql?(existing)
          puts "#{green("identical")} #{output}"
        else
          File.mkpath(File.dirname(output_file)) unless File.exists?(output_file)
          
          File.open(output_file, "w") do |f|
            f.write(code)

            gzip = Zlib::Deflate.new
            deflate = gzip.deflate(code)
            gzip.close

            output_str = "#{output} #{yellow(">>>")} #{cyan("#{filesize(code.size)} (#{filesize(deflate.size)} gzip)")}"

            if (output_file_exists)
              puts "#{yellow("overwrite")} #{output_str}"
            else
              puts "#{green("create")} #{output_str}"
            end
          end unless code.nil?
        end
      end

    end
  end
end

def watch_closure
  include Term::ANSIColor

  puts ">>> Polling for JavaScript changes. Press Ctrl-C to Stop"

  # Run once on initialization
  compile_js
  
  FSSM.monitor do
    path PROJECT_ROOT do
      glob "**/*.{js,json}"

      update do |base, relative|
        compile_js relative
      end
    end
  end
end
