#!/usr/bin/env bash

IMAGE_NAME="${IMAGE_NAME:-$(basename $(pwd))}"
docker build \
  -t "${IMAGE_NAME}:latest" \
  -t "bhudgens/${IMAGE_NAME}:latest" .

docker push "bhudgens/${IMAGE_NAME}:latest"
