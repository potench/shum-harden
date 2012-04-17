require "rubygems"
require "fssm"
require "digest/md5"
require "term/ansicolor"

class Rosy::Watch::AppCache
  include Rosy
  include Term::ANSIColor
  
  def initialize
    @static = "#{STATIC_DIR.gsub!(PROJECT_ROOT + "/", "")}/"
    @manifest = File.join(@static, "default.appcache")
  end
  
  def update(relative = nil)
	if (File.exist?(@manifest))
		hash = Digest::MD5.hexdigest(File.read(@manifest))
		
		File.open(@manifest, 'r+') do |f|   # open file for update
			lines = f.readlines              # read into array of lines
			lines.each do |it|               # modify lines
				it.gsub!(/md5 (.*)/, "md5 #{hash.to_s}")
			end
			
			f.pos = 0                        # back to start
			f.print lines                    # write out modified lines
			f.truncate(f.pos)                # truncate to new length
		end
		
        puts "#{yellow("updated")} #{@manifest}"
    end unless relative.include?(".min.")
  end

  def run
    puts ">>> Polling for application changes. Press Ctrl-C to Stop"

    # Run once on initialization
    block = self

    FSSM.monitor do
      path PROJECT_ROOT do
        glob "**/*.{js,json,css,png,jpg,gif,html,xml}"

        update do |base, relative|
          block.update relative
        end
      end
    end
  end
end
