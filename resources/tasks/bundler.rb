require "jshint"

class Rosy::Development::Bundler
  include Rosy
  
  def initialize
    @path = File.join(CONFIG_DIR, "Gemfile")
  end
  
  def run
    system "bundle install --gemfile #{@path}"
  end
end
