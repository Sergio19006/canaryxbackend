#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git pull
  git checkout --track origin/master
  git merge develop
}

upload_files() {
  git remote add origin https://Sergio19006:${GH_TOKEN}@github.com/Sergio19006/canarybackend.git > /dev/null 2>&1
  git push origin master --quiet

setup_git
commit_website_files
upload_files