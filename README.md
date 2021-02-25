## Status

### API integration

| End point      | DySE           | Delhi  |
| ------------- |-------------| -----|
| POST /create-model | :white_check_mark: | :white_check_mark: |
| GET /models/:modelId | :question: | :question: |
| POST /models/:modelId/experiments | :white_check_mark: | :white_check_mark: |
| GET /models/:modelId/experiments/:experimentId | :white_check_mark: | :white_check_mark: |
| POST /models/:modelId/edit-indicators | :white_check_mark: | :question: |
| POST /models/:modelId/edit-edges | :construction: | :question: |


### Experiment types
| Experiment type      | DySE           | Delhi  | Causemos |
| ------------- |-------------| -----| ---- |
| Projection | :white_check_mark: | :construction: | :white_check_mark: |
| Sensitivity | :white_check_mark: | :question: | :construction: |
| Goal optimizaiton | :white_check_mark: | :question: | :question: |
| Validation | :white_check_mark: | :question: | :question: |



## View Swagger-UI
docker run -p 80:8080 -e SWAGGER_JSON=/api.yml -v $(pwd)/api.yml:/api.yml swaggerapi/swagger-ui

