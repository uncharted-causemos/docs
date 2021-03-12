#!/usr/bin/env bash

HOST=$1
AUTH=$2
MODEL=$3
PAYLOAD=$4

curl -XPOST \
  -H "Authorization: Basic $AUTH" \
  -H "Content-type: application/json" \
   $HOST/models/$MODEL/experiments -d@$PAYLOAD
