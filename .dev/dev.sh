#!/usr/bin/env bash

nodemon -e json,js,Dockerfile -x ".dev/build.sh && .dev/run.sh" 
