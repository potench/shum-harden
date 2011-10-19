class Rosy::Development::Update
  include Rosy
  
  def initialize
    @boilerplate = %x[git remote show | grep boilerplate]
    @compass = %x[git remote show | grep compass]
    @rosy = %x[git remote show | grep rosy]

    @branch = %x[git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/']
    @branch.gsub!(/\*[\w+]?/, "").strip!
  end

  def update_subtree repo
    system("git pull -s subtree #{repo} #{@branch}")
  end

  def update_boilerplate
    p "Fetching the latest Red Boilerplate..."

    system("git fetch --no-tags boilerplate")
    system("git merge boilerplate/master")
  end

  def update_compass
    p "Updating Red Compass Framework..."

    self.update_subtree "compass"
  end

  def update_rosy
    p "Updating Rosy..."
    
    self.update_subtree "rosy"
  end
  
  def run
    self.update_boilerplate unless @boilerplate.empty?
    self.update_compass unless @compass.empty?
    self.update_rosy unless @rosy.empty?
  end
end