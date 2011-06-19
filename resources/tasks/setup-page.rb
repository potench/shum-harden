require "highline/import"

PAGE_TEMPLATE = File.join(CONFIG_DIR, "default-page.js")

def find_local_directory
  file = Dir["**/base/page.js"][0]
  
  if File.exists?(file)
    directory = File.dirname(file).sub("base", "")
  end
  
  directory
end

def generate_js directory
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
  FileUtils.cp(PAGE_TEMPLATE, new_file)
  
  File.open(new_file, "r+") do |f|
    lines = f.readlines
    lines.each do |line|
      line.gsub!(/__PAGE__/, @name);
      line.gsub!(/__PAGENAME__/, @name.downcase);
      line.gsub!(/__NAMESPACE__/, @space);
    end
    f.pos = 0
    f.print lines
    f.truncate(f.pos)
  end
  
  say("\n")
  say("Your file is at #{new_file}")
  say("\n")
  say("Don't forget to:")
  say("    1. Add your file to base.html")
  say("    2. Add your file to #{File.join(CONFIG_DIR, "setup.json")}")
  say("\n")
end

def create_page
  directory = find_local_directory
  
  if directory.nil?
    say("No local directory found.")
    return
  end
  
  generate_js directory
end