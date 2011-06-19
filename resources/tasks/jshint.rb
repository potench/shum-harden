require "jshint"

def jshint
  JSHint::Lint.new(:config_path => File.join(CONFIG_DIR, "jshint.yml")).run
end