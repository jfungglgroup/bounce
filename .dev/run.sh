#!/usr/bin/env bash

IMAGE_NAME="${IMAGE_NAME:-$(basename $(pwd))}"

[ -t 0 ] && TTY=t

docker run \
  -i${TTY} \
  --rm \
  --init \
  "${IMAGE_NAME}"
