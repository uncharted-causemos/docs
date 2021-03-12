#!/usr/bin/env bash

HOST=$1
MODEL=$2
EID=$3

echo "$HOST/delphi/models/$MODEL/experiments/$EID"
curl -XGET \
  -H "Content-type: application/json" \
  $HOST/delphi/models/$MODEL/experiments/$EID

