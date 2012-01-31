class Rosy::Development::Update
  include Rosy
  
  def initialize
    @boilerplate = %x[git remote show | grep boilerplate]
    @caboose = %x[git remote show | grep caboose]
    @rosy = %x[git remote show | grep rosy]

    @branch = %x[git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/']
    @branch.gsub!(/\*[\w+]?/, "").strip!
  def add_boilerplate
    system("git remote add --fetch --no-tags --track #{@branch} boilerplate git://github.com/ff0000/red-boilerplate.git")
    system("git pull -X ours boilerplate #{@branch}")
  end

  def update_subtree repo
    system("git pull -s subtree #{repo} #{@branch}")
  end

  def update_boilerplate
    p "Fetching the latest Red Boilerplate..."

    system("git fetch --no-tags boilerplate")
    system("git merge -X ours boilerplate/#{@branch}")
  end

  def update_caboose
    p "Updating Caboose..."

    self.update_subtree "caboose"
  end

  def update_rosy
    p "Updating Rosy..."
    
    self.update_subtree "rosy"
  end
  
  def run
    @boilerplate.empty? ? self.add_boilerplate : self.update_boilerplate
    self.update_caboose unless @caboose.empty?
    self.update_rosy unless @rosy.empty?
  end
end