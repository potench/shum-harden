require "jshint"

class Rosy::Development::JSHint
  include Rosy
  
  def initialize
    @path = File.join(CONFIG_DIR, "jshint.yml")
  end
  
  def lint
    JSHint::Lint.new(:config_path => @path).run
  end
end
