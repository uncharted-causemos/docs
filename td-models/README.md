## Status
Integration and completion status with respect to api spec.

### API integration

| End point      | DySE           | Delphi  |
| ------------- |-------------| -----|
| POST /create-model | :white_check_mark: | :white_check_mark: |
| GET /models/:modelId | :white_check_mark: | :white_check_mark: |
| POST /models/:modelId/experiments | :white_check_mark: | :white_check_mark: |
| GET /models/:modelId/experiments/:experimentId | :white_check_mark: | :white_check_mark: |
| POST /models/:modelId/edit-indicators | :white_check_mark: | :question: |
| POST /models/:modelId/edit-edges | :white_check_mark: | :question: |


### Experiment types
| Experiment type      | DySE           | Delphi  | Sensei |Causemos (UI/interaction) |
| ------------- |-------------| -----| ---- | ----- |
| Projection | :white_check_mark: | :white_check_mark: | ✅ | :white_check_mark: |
| Sensitivity | :white_check_mark: | :question: | ❓ | :white_check_mark: |
| Goal optimizaiton | :white_check_mark: | :question: | ❓| :question: |
| Validation | :white_check_mark: | :question: | ❓| :question: |



## View Swagger-UI
The API specification is compatible with Swggger-UI viewer (https://hub.docker.com/r/swaggerapi/swagger-ui)
To view the the spec locally via docker:

```
docker run -p 80:8080 -e SWAGGER_JSON=/api.yml -v $(pwd)/api.yml:/api.yml swaggerapi/swagger-ui
```
