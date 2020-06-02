#!/bin/sh

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git fetch
  git checkout -b master
  git merge develop
}

upload_files() {
  git push https://${GH_TOKEN}@github.com/Sergio19006/canarybackend.git
}

setup_git
commit_website_files
upload_files