require "highline/import"

class Rosy::Create::Page
  include Rosy
  
  def initialize
    @template = File.join(CONFIG_DIR, "default-page.js")
    @file = Dir["**/base/page.js"][0]
  end
  
  def find_local_directory
    if File.exists?(@file)
      directory = File.dirname(@file).sub("base", "")
    end

    directory
  end

  def generate directory
    say("Generating your file.")
    say("\n")
    say("You'll be asked for:")
    say("    1. Your site namespace.")
    say("    2. The class you'd like to generate.")
    say("\n")

    @space = ask("Namespace?")
    say("\n")
    @name = ask("Class name?")

    new_file = File.join(directory, "#{@name.downcase}.js")

    tmpl = File.read(@template)
    tmpl.gsub!(/__PAGE__/, @name)
    tmpl.gsub!(/__PAGENAME__/, @name.downcase)
    tmpl.gsub!(/__NAMESPACE__/, @space)

    File.open(new_file, "w") do |file|
      file.puts tmpl
    end

    say("\n")
    say("Your file is at #{new_file}")
    say("\n")
    say("Don't forget to:")
    say("    1. Add your file to base.html")
    say("    2. Add your file to #{File.join(CONFIG_DIR.gsub!(PROJECT_ROOT + "/", ""), "js-compile.json")}")
    say("\n")
  end

  def create
    directory = self.find_local_directory

    if directory.nil?
      say("No local directory found.")
      return
    end

    self.generate directory
  end
end
