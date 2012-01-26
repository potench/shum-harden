require "fssm"
require "term/ansicolor"

class Rosy::Watch::All
  include Rosy
  include Term::ANSIColor

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
      Rosy::Watch::JSHint.new.hint relative if @nohint.nil?

      if which("uglifyjs")
        Rosy::Watch::Uglify.new.compile relative
      else
        Rosy::Watch::Closure.new.compile relative
      end
    elsif ext.eql?(".scss")
      Rosy::Watch::Compass.new.compile relative
    end
  end
  
  def run(nohint = nil)
    puts ">>> Polling for JavaScript & SASS changes. Press Ctrl-C to Stop"

    @nohint = nohint
    block = self

    FSSM.monitor do
      path PROJECT_ROOT do
        glob "**/*.{js,json,scss}"

        update do |base, relative|
          block.compile relative
        end
      end
    end
  end
end