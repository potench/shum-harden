require "fssm"
require "json"
require "zlib"
require "term/ansicolor"
require "closure-compiler"

class Rosy::Development::Sanity
  include Rosy
  include Term::ANSIColor
  
  def initialize
    @file = File.join(CONFIG_DIR, "setup.json")
    @json = JSON.parse(File.read(@file))
    @static = "#{STATIC_DIR.gsub!(PROJECT_ROOT + "/", "")}/"
  end

  def run
    # More expensive, but allows for live editing of JSON file
    @json = JSON.parse(File.read(@file))

    sources = Dir[File.join(@static, "js", "**", "*.js")]
    unmatched = []

    sources.each do |existing_file|
      existing_file.gsub!(@static, "")
      file_is_compressed = nil

      @json.each_pair do |key, group|
        source_group = group["source"].to_a

        if (source_group.include?(existing_file))
          file_is_compressed = true
        end
      end

      unmatched.push(existing_file) unless file_is_compressed or existing_file.include?(".min.js")
    end

    if unmatched.length
      puts ">>> The following files were not found in setup.json. Did you forget to add them for compilation?"
      unmatched.each do |file|
        puts "    #{yellow("missing")} #{file}"
      end
    end
  end
end
