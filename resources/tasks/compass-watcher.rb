require "sass"
require "compass"

class Rosy::Watch::Compass
  include Rosy
  
  def initialize
    @dir = File.join(RESOURCE_DIR, "compass")
  end
  
  def run
    system "compass watch #{@dir}"
  end
end