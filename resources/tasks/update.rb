class Rosy::Development::Update
  include Rosy
  
  def initialize
    @boilerplate = %x[git remote show | grep boilerplate]
    @compass = %x[git remote show | grep compass]
    @rosy = %x[git remote show | grep rosy]
  end

  def update_subtree repo
    system("git pull -s subtree #{repo} master")
  end

  def update_boilerplate
    p "git pull boilerplate master"
  end

  def update_compass
    self.update_subtree "compass"
  end

  def update_rosy
    self.update_subtree "rosy"
  end
  
  def run
    self.update_boilerplate unless @boilerplate.empty?
    self.update_compass unless @compass.empty?
    self.update_rosy unless @rosy.empty?
  end
end