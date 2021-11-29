const _ = require('lodash');
const request = require('request');
const fs = require('fs');
const config = require('./config.json');

// Helper
const requestAsPromise = (options) => {
  return new Promise(function(resolve, reject) {
    if (_.isNil(options.url) || _.isNil(options.method)) {
      reject(new Error('Insufficient information to make request'));
    }

    if (!options.timeout) {
      options.timeout = 45000;
    }

    request(options, function (error, response, body) {
      if (!_.isNil(error)) {
        reject(error);
      } else if (_.isNil(response) || _.isNil(response.statusCode)) {
        reject(new Error('Non-existent or invalid response object'));
      } else if (response.statusCode < 200 || response.statusCode > 299) {
        console.error(response.body);
        reject(new Error('Unexpected status code ' + response.statusCode));
      } else {
        resolve(body);
      }
    });
  });
};

const basicAuth = (user, pass) => {
  return 'Basic ' + Buffer.from(user + ':' + pass).toString('base64');
};

const sleep = async (v) => {
  console.log(`\tsleeping ${v}...`);
  return await new Promise(resolve => setTimeout(resolve, v));
}

// Create model
const createModel = async (payload) => {
  const url = config.url + '/create-model';
  console.log(`creating model...${url}`);
  const options = {
    method: 'POST',
    url: url,
    headers: {
      'Authorization': basicAuth(config.user, config.pass),
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    json: payload
  };
  return requestAsPromise(options);
};

const trainingStatus = async (modelId) => {
  const url = config.url + `/models/${modelId}`;

  console.log(`checking training status...${url}`);
  const options = {
    method: 'GET',
    url: config.url + `/models/${modelId}`,
    headers: {
      'Authorization': basicAuth(config.user, config.pass),
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    json: {}
  };
  return requestAsPromise(options);
};

const projectionRequest = async (modelId, payload) => {
  const url = config.url + `/models/${modelId}/experiments`;

  console.log(`sending projection request...${url}`);
  const options = {
    method: 'POST',
    url: url,
    headers: {
      'Authorization': basicAuth(config.user, config.pass),
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    json: payload
  };
  return requestAsPromise(options);
};

const experimentStatus = async (modelId, experimentId) => {
  const url = config.url + `/models/${modelId}/experiments/${experimentId}`;

  console.log(`checking experiment ...${url}`);
  const options = {
    method: 'GET',
    url: url,
    headers: {
      'Authorization': basicAuth(config.user, config.pass),
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    json: {}
  };
  return requestAsPromise(options);
};



////////////////////////////////////////////////////////////////////////////////
// Run test
////////////////////////////////////////////////////////////////////////////////
const model = process.argv[2];
if (!model) {
  console.log('usage: node ./run-test <model>');
  process.exit(0)
}

async function runTest() {
  let result = null;
  const createModelPayload = require(`./data/${model}/model.json`);
  const projectionPayload = require(`./data/${model}/projection.json`);

  result = await createModel(createModelPayload);
  console.log('model status', result.status);

  /* Train loop */
  while(true && result.status !== 'ready') {
    await sleep(8000);
    result = await trainingStatus(model);
    console.log('training status', result.status);
    if (result.status === 'ready') {
      break;
    }
  }

  /* Experiment request */
  result = await projectionRequest(model, projectionPayload);
  const experimentId = result.experimentId;
  console.log('experiment id', experimentId);
  

  /* Experiment loop */
  while(true) {
    await sleep(3000);
    try {
      result = await experimentStatus(model, experimentId);
      if (result.status === 'completed') {
        break;
      }
    } catch (err) {
      console.log('error', err);
    }
  }

  /* Print */
  console.log(JSON.stringify(result, null, 2));
}

runTest();
