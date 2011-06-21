require "highline/import"

class Rosy::Create::Boilerplate
  include Rosy
  
  def initialize
    @boilerplate = "git://github.com/ff0000/red-boilerplate.git"
    @rosy = "git://github.com/ff0000/rosy.git"
    @compass = "git://github.com/ff0000/red-compass-framework.git"
  end
  
  def subtree_merge project, local, remote, path, branch
    system("git remote add -f #{local} #{remote}")
    system("git merge -s ours --no-commit #{local}/#{branch}")
    system("git read-tree --prefix=#{path} -u #{local}/#{branch}")
    system("git commit -m 'Merge of #{project}'")
    system("git pull -s subtree #{local} #{branch}")
  end
  
  def setup_boilerplate
    system("git remote add boilerplate #{@boilerplate}")
    system("git pull boilerplate master")
  end
  
  def setup_rosy
    subtree_merge "Rosy", "rosy", @rosy, File.join(STATIC_DIR, "js"), "master"
  end
  
  def setup_compass
    subtree_merge "Red Compass Framework", "compass", @compass, File.join(RESOURCE_DIR, "compass"), "master"
  end
  
  def create
    setup_boilerplate
    setup_rosy
    setup_compass
  end
end
