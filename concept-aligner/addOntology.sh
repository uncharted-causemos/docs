#!/usr/bin/env bash

# Original format
source ./vars.sh

curl -XPUT -H "Content-type: application/json" "$HOST_URL/v2/addOntology?secret=${SECRET}&ontologyId=${ONTOLOGY_ID}"
