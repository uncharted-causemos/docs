#!/usr/bin/env bash

source ./vars.sh

MODEL="HAS_DATA"
SLEEP=10

echo "Creating model with indicator data"
time ./create-model.sh $HOST $AUTH "data/${MODEL}.json"

echo "Sleeping $SLEEP"
sleep $SLEEP
./model-status.sh $HOST $AUTH $MODEL

echo "Sleeping $SLEEP"
sleep $SLEEP
./model-status.sh $HOST $AUTH $MODEL

echo "Running experiment"
EID=$(./project.sh $HOST $AUTH $MODEL "data/project.json" | python -c \
    'import json,sys;print json.load(sys.stdin)["experimentId"]')

echo "Sleeping 10s"
sleep 10
echo "Fetching experiment result $HOST $MODEL $EID"
./experiment-result.sh $HOST $AUTH $MODEL $EID
