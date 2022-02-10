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
      options.timeout = 45000 * 2;
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

  let start = 0 ;
  let end = 0; 

  start = (new Date()).getTime();
  try {
    result = await createModel(createModelPayload);
  } catch (e) {
    console.log('ERROR', e);
    return;
  }
  console.log('model status', result.status);
  end = (new Date()).getTime();

  console.log(`\n== Create mode elapsed in ${end - start} millis`);

  /* Train loop */
  start = (new Date()).getTime();
  while(true && result.status !== 'ready') {
    await sleep(5000);

    const statusQueryStart = (new Date()).getTime();
    result = await trainingStatus(model);
    console.log(JSON.stringify(result));
    const statusQueryEnd = (new Date()).getTime();
    console.log(`status query took ${statusQueryEnd - statusQueryStart} millis`);

    if (result.status === 'ready' || result.status === 'success') {
      break;
    }
  }
  end = (new Date()).getTime();
  console.log(`\n== Train model elapsed in ${end - start} millis`);

  /* Experiment request */
  result = await projectionRequest(model, projectionPayload);
  const experimentId = result.experimentId;
  console.log('experiment id', experimentId);
  

  /* Experiment loop */
  start = (new Date()).getTime();
  while(true) {
    await sleep(3000);
    try {
      result = await experimentStatus(model, experimentId);
      console.log(result);
      if (result.status === 'completed' || result.status === 'Completed') {
        break;
      }
    } catch (err) {
      console.log('error', err);
    }
  }
  end = (new Date()).getTime();
  console.log(`\n== Experiment elapsed in ${end - start} millis`);

  /* Print */
  // console.log(JSON.stringify(result, null, 2));
}

runTest();
