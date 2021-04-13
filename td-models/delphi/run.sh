#!/usr/bin/env bash

/usr/bin/docker run \
  --rm \
  --name delphi \
  -d \
  -p 5000:5000 \
  --mount type=bind,source=/home/centos/dbdata,target=/dbdata \
  --env DELPHI_DB=/dbdata/delphi.db \
  --env DELPHI_N_SAMPLES=50 \
  docker.uncharted.software/worldmodeler/wm-delphi:latest
