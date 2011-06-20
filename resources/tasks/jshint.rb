require "jshint"

class Rosy::Development::JSHint
  include Rosy
  
  def initialize
    @path = File.join(CONFIG_DIR, "jshint.yml")
  end
  
  def run
    JSHint::Lint.new(:config_path => @path).lint
  end
end
