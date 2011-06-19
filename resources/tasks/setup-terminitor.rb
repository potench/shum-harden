require "rbconfig"
require "terminitor"

TERMINITOR_FILE = "example.term"
CONFIG = File.join(CONFIG_DIR, TERMINITOR_FILE)
MASTER = File.expand_path(File.join("~", ".config", "terminitor"))

def setup_terminitor

  if File.exists?(File.join(MASTER, TERMINITOR_FILE))
    puts "File exists! Aborting."
    return
  end
  
  if File.exists?(CONFIG) and File.exists?(MASTER)
    FileUtils.cp(CONFIG, MASTER)
    puts "Done. You can start the project by running 'terminitor start example'"
  else
    p "No config file found" unless File.exists?(CONFIG)
    p "No master directory" unless File.exists?(MASTER)
  end
end