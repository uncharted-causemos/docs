#!/usr/bin/env bash

source ./vars.sh

MODEL="NO_DATA"

echo "Creating model without indicator data"
time ./create-model.sh $HOST $AUTH "data/${MODEL}.json"

echo "Running experiment"
EID=$(./project.sh $HOST $AUTH $MODEL "data/project.json" | python -c \
    'import json,sys;print json.load(sys.stdin)["experimentId"]')

echo "Fetching experiment result $EID"
./experiment-result.sh $HOST $AUTH $MODEL $EID
