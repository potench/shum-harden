require "sass"
require "compass"

COMPASS_DIR = File.join(RESOURCE_DIR, "compass")

def watch_compass
  system "compass watch #{COMPASS_DIR}"
end