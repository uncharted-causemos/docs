#!/usr/bin/env bash

# Original format
source ./vars.sh

# curl -XPUT -H "Content-type: application/json" "$HOST_URL/v2/bulkCompositionalSearch?maxHits=3&threshold=0.2&ontologyId=${ONTOLOGY_ID}&secret=${SECRET}" -d'
# [
#   {
#     "homeId": {
#       "concept": "wm/concept/economy/livelihood"
#     },
#     "awayId": {}
#   },
#   {
#     "homeId": {
#       "concept": "wm/concept/economy/expense"
#     },
#     "awayId": {}
#   }
# ]
# '


curl -XPUT -H "Content-type: application/json" "http://linking.cs.arizona.edu/v2/bulkCompositionalSearch?ontologyId=acab3922-b952-4bc0-9fb1-129659a42baa&secret=causemosnaut&maxHits=3&threshold=0.3" -d'
[
    {
        "homeId": {
          "concept": "wm/concept/agriculture/crop/cereal_crops"
        },
        "awayId": [],
        "context": ""
    },
    {
        "homeId": {
            "concept": "wm/concept/economy/livelihood"
        },
        "awayId": [],
        "context": ""
    },
    {
        "homeId": {
            "conceptProperty": "wm/property/price_or_cost"
        },
        "awayId": [],
        "context": ""
    }
]
'
