#!/usr/bin/env bash

push=false

while getopts 'p' flag; do
  case "${flag}" in
    p) push=true ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done

docker build --pull -t mygov:latest .

if $push
then
  docker tag mygov:latest registry.hena.re/mygov:latest
  docker push registry.hena.re/mygov:latest
fi
