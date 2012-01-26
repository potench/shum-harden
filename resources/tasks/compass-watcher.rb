require "sass"
require "compass"

class Rosy::Watch::Compass
  include Rosy
  
  def initialize
    @dir = File.join(RESOURCE_DIR, "compass")
  end

  def compile(relative = nil)
    system "compass compile #{@dir}"
  end
  
  def run
    system "compass watch #{@dir}"
  end
end