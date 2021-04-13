#!/usr/bin/env bash

HOST=$1
AUTH=$2
MODEL=$3

echo "$HOST/models/$MODEL"
curl -XGET \
  -H "Authorization: Basic $AUTH" \
  -H "Content-type: application/json" \
  $HOST/models/$MODEL

