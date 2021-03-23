#!/usr/bin/env bash

source ./vars.sh

MODEL="NO_DATA"
SLEEP=5

echo "Creating model without indicator data"
time ./create-model.sh $HOST $AUTH "data/${MODEL}.json"

echo "Sleeping $SLEEP"
./model-status.sh $HOST $AUTH $MODEL
sleep $SLEEP

echo "Sleeping $SLEEP"
./model-status.sh $HOST $AUTH $MODEL
sleep $SLEEP

echo "Running experiment"
EID=$(./project.sh $HOST $AUTH $MODEL "data/project.json" | python -c \
    'import json,sys;print json.load(sys.stdin)["experimentId"]')

echo "Sleeping 10s"
sleep 10

echo "Fetching experiment result $EID"
./experiment-result.sh $HOST $AUTH $MODEL $EID
