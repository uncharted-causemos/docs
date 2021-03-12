#!/usr/bin/env bash

HOST=$1
MODEL=$2
PAYLOAD=$3

curl -XPOST \
  -H "Content-type: application/json" \
   $HOST/delphi/models/$MODEL/experiments -d@$PAYLOAD
