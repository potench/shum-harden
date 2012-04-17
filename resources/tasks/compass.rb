require "sass"
require "compass"

class Rosy::Development::Compass
  include Rosy
  
  def initialize
    @dir = File.join(RESOURCE_DIR, "compass")
  end
  
  def run
    system "compass compile -f #{@dir}"
  end
end