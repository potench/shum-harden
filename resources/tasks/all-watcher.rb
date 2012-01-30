require "fssm"
require "term/ansicolor"

class Rosy::Watch::All
  include Rosy
  include Term::ANSIColor

  def initialize
    @jshinter = Rosy::Watch::JSHint.new
    @compass = Rosy::Watch::Compass.new
    @compiler = nil
  end

  # Cross-platform way of finding an executable in the $PATH.
  #
  #   which('ruby') #=> /usr/bin/ruby
  def which(cmd)
    exts = ENV['PATHEXT'] ? ENV['PATHEXT'].split(';') : ['']
    ENV['PATH'].split(File::PATH_SEPARATOR).each do |path|
      exts.each { |ext|
        exe = "#{path}/#{cmd}#{ext}"
        return exe if File.executable? exe
      }
    end
    return nil
  end  

  def compile(relative = nil)
    ext = File.extname(relative)

    if ext.eql?(".js") or ext.eql?(".json")
      @jshinter.hint relative if @nohint.nil?

      if @compiler.nil?
        @compiler = which("uglifyjs") ? Rosy::Watch::Uglify.new : Rosy::Watch::Closure.new
      end

      @compiler.compile relative
    elsif ext.eql?(".scss")
      @compass.compile relative
    end
  end
  
  def run(nohint = nil)
    puts ">>> Polling for JavaScript & SASS changes. Press Ctrl-C to Stop"

    @nohint = nohint
    block = self

    FSSM.monitor do
      path PROJECT_ROOT do
        glob "**/*[^\.min].{js,json,scss}"

        update do |base, relative|
          block.compile relative
        end
      end
    end
  end
end