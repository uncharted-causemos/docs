#!/usr/bin/env bash

# Original format
source ./vars.sh

curl -XPUT -H "Content-type: application/json" "$HOST_URL/v1/compositionalSearch?maxHits=3&threshold=0.4" -d'
{
  "homeId": {
    "concept": "wm/concept/agriculture/crop/cereals"
  },
  "awayId": {}
}
'
