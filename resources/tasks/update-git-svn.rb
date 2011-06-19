def update_git
  out = %x[git diff-files]

  if out.empty?
    system "git svn rebase"
  else
    system "git stash save && git svn rebase && git stash apply"
  end
end