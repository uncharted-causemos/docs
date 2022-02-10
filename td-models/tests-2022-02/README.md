## Setup
Requires Node 12 or higher

```
npm install
```


### Test runner
Fill in the relevant configuration fields in `config.json`

#### Test
```
node ./run-test.js <model>
```

Each model refers to a corresponding folder under the `data/<model>` directory, and has a
- model.json, denoting create-model, and
- projectin.json, denoting the projection experiment



### Converter
Converts current Jan2022 to May2021. This will output the model onto STDOUT

```
node ./convertMay2021.js <path_to_model_file>
```
