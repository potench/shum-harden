require "fssm"
require "jshint"
require "term/ansicolor"

class Rosy::Watch::JSHint
  include Rosy
  include Term::ANSIColor
  
  def initialize
    @path = File.join(CONFIG_DIR, "jshint.yml")
  end
  
  def hint relative
    begin
      JSHint::Lint.new(
        :paths => [relative],
        :config_path => @path
      ).run
    rescue JSHint::LintCheckFailure => error
      puts error
    end
  end
  
  def run
    puts ">>> Polling for JavaScript changes. Press Ctrl-C to Stop"
    
    block = self

    FSSM.monitor do
      path PROJECT_ROOT do
        glob "**/*.js"

        update do |base, relative|
          block.hint relative
        end
      end
    end
  end
end
