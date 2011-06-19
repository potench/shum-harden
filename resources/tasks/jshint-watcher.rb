require "fssm"
require "jshint"
require "term/ansicolor"

def run_jshint relative
  begin
    JSHint::Lint.new(
      :paths => [relative],
      :config_path => File.join(CONFIG_DIR, "jshint.yml")
    ).run
  rescue JSHint::LintCheckFailure => error
    puts error
  end
end

def watch_jshint
  include Term::ANSIColor

  puts ">>> Polling for JavaScript changes. Press Ctrl-C to Stop"
  
  FSSM.monitor do
    path PROJECT_ROOT do
      glob "**/*.js"

      update do |base, relative|
        run_jshint relative
      end
    end
  end
end
