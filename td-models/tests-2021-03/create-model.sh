#!/usr/bin/env bash

HOST=$1
AUTH=$2
PAYLOAD=$3

curl -XPOST \
  -H "Authorization: Basic $AUTH" \
  -H "Accept: application/json" \
  -H "Content-type: application/json" \
  $HOST/create-model -d@$PAYLOAD

