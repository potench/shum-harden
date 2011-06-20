class Rosy::Development::GitSVN
  include Rosy
  
  def initialize
    @out = %x[git diff-files]
  end
  
  def update
    if @out.empty?
      system "git svn rebase"
    else
      system "git stash save && git svn rebase && git stash apply"
    end
  end
end