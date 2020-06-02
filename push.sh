#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git pull
  git checkout master
  git merge develop
}

upload_files() {
  git push origin master
}

setup_git
commit_website_files
upload_files