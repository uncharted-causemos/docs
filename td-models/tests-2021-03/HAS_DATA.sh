#!/usr/bin/env bash

source ./vars.sh

MODEL="HAS_DATA"

echo "Creating model with indicator data"
time ./create-model.sh $HOST $AUTH "data/${MODEL}.json"

echo "Running experiment"
EID=$(./project.sh $HOST $AUTH $MODEL "data/project.json" | python -c \
    'import json,sys;print json.load(sys.stdin)["experimentId"]')

echo "Fetching experiment result $HOST $MODEL $EID"
./experiment-result.sh $HOST $AUTH $MODEL $EID
