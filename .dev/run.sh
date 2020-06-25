#!/usr/bin/env bash

IMAGE_NAME="${IMAGE_NAME:-$(basename $(pwd))}"

docker run \
  -it \
  --rm \
  --init \
  "${IMAGE_NAME}"
