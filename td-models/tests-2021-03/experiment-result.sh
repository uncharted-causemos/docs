#!/usr/bin/env bash

HOST=$1
AUTH=$2
MODEL=$3
EID=$4

echo "$HOST/delphi/models/$MODEL/experiments/$EID"
curl -XGET \
  -H "Authorization: Basic $AUTH" \
  -H "Content-type: application/json" \
  $HOST/models/$MODEL/experiments/$EID

