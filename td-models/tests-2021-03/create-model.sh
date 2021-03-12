#!/usr/bin/env bash

HOST=$1
PAYLOAD=$2

curl -XPOST \
  -H "Accept: application/json" \
  -H "Content-type: application/json" \
  $HOST/delphi/create-model -d@$PAYLOAD

