require "fssm"
require "json"
require "zlib"
require "term/ansicolor"
require "uglifier"

class Rosy::Watch::Uglify
  include Rosy
  include Term::ANSIColor
  
  def initialize
    @file = File.join(CONFIG_DIR, "setup.json")
    @json = JSON.parse(File.read(@file))
    @static = "#{STATIC_DIR.gsub!(PROJECT_ROOT + "/", "")}/"
    @compiled = Hash.new
    @options = {
      :mangle => true, # Mangle variables names
      :toplevel => false, # Mangle top-level variable names
      :except => [], # Variable names to be excluded from mangling
      :max_line_length => 32 * 1024, # Maximum line length
      :squeeze => true, # Squeeze code resulting in smaller, but less-readable code
      :seqs => true, # Reduce consecutive statements in blocks into single statement
      :dead_code => true, # Remove dead code (e.g. after return)
      :lift_vars => false, # Lift all var declarations at the start of the scope
      :unsafe => false, # Optimizations known to be unsafe in some situations
      :copyright => false, # Show copyright message
      :ascii_only => false, # Encode non-ASCII characters as Unicode code points
      :inline_script => false, # Escape </script
      :quote_keys => false, # Quote keys in object literals
      :beautify => false, # Ouput indented code
      :beautify_options => {
        :indent_level => 4,
        :indent_start => 0,
        :space_colon => false
      }
    }
  end
  
  def compile(relative = nil)
    match = relative.sub(@static, "") unless relative.nil?

    # More expensive, but allows for live editing of JSON file
    @json = JSON.parse(File.read(@file)) if match.eql?(@file)

    @json.each_pair do |key, group|
      self.build key, group, relative, match
    end
  end

  def build(key, group, relative = nil, match = nil)
    source = group["source"].to_a
    output = group["output"].to_s

    return if key.eql?("exclude") or output.nil?

    if match.eql?(@file) or source.include?(match) or relative.nil?
      puts ">>> #{(relative.nil? || match.eql?(@file)) ? "Compiling" : "Change detected to: #{relative} in"} group \"#{key}\""

      code = String.new

      begin
        source.each do |file|
          current = File.join(STATIC_DIR, file)

          if File.exists?(current)
            if file.eql?(match) or @compiled[file].nil?
              puts "    #{cyan("compile")} #{file}"
              @compiled[file] = Uglifier.new(@options).compile(File.read(current))
            end

            code << @compiled[file]
          else
            puts "    #{red("missing")} #{file}"
          end
        end
      rescue Uglifier::Error => error
        puts "    #{red("error:")}"
        puts error
      else
        output_file = File.join(STATIC_DIR, output)
        output_file_exists = File.exists?(output_file)
        existing = File.read(output_file) if output_file_exists

        if code.eql?(existing)
          puts "#{green("identical")} #{output}"
        else
          FileUtils.mkpath(File.dirname(output_file)) unless File.exists?(output_file)

          File.open(output_file, "w") do |f|
            f.write(code)

            gzip = Zlib::Deflate.new
            deflate = gzip.deflate(code, Zlib::FINISH)
            gzip.close

            output_str = "#{output} #{yellow(">>>")} #{cyan("#{self.filesize(code.size)} (#{self.filesize(deflate.size)} gzip)")}"

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

  def update
    # More expensive, but allows for live editing of JSON file
    @json = JSON.parse(File.read(@file))

    @json.each_pair do |key, group|
      source = group["source"].to_a
      output = group["output"].to_s

      output_file = File.join(STATIC_DIR, output)

      if File.exists?(output_file)
        source.each do |file|
          current = File.join(STATIC_DIR, file)

          output_modified_time = File.ctime(output_file)

          if File.exists?(current)
            if File.ctime(current) > output_modified_time
              self.build key, group
              break
            end
          else
            puts "    #{red("missing")} #{file}"
          end
        end
      else
        self.build key, group
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
  
  def run
    puts ">>> Polling for JavaScript changes. Press Ctrl-C to Stop"

    block = self

    # Run once on initialization
    block.update

    FSSM.monitor do
      path PROJECT_ROOT do
        glob "**/*.{js,json}"

        update do |base, relative|
          block.compile relative
        end
      end
    end
  end
end