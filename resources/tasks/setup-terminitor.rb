class Rosy::Platform::Terminitor
  include Rosy
  
  def initialize
    require "rbconfig"
    require "terminitor"
    
    @file = "example.term"
    @config = File.join(CONFIG_DIR, TERMINITOR_FILE)
    @master = File.expand_path(File.join("~", ".config", "terminitor"))
  end

  def setup
    if File.exists?(File.join(@master, @file))
      puts "File exists! Aborting."
      return
    end

    if File.exists?(@config) and File.exists?(@config)
      FileUtils.cp(@config, @master)
      puts "Done. You can start the project by running 'terminitor start example'"
    else
      p "No config file found" unless File.exists?(@config)
      p "No master directory" unless File.exists?(@master)
    end
  end
end
