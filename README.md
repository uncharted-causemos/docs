## Status

| End point      | DySE           | Delhi  |
| ------------- |-------------| -----|
| POST /create-model | :white_check_mark: | :white_check_mark: |
| GET /models/:modelId | :question: | :question: |
| POST /models/:modelId/experiments | :white_check_mark: | :white_check_mark: |
| GET /models/:modelId/experiments/:experimentId | :white_check_mark: | :white_check_mark: |
| POST /models/:modelId/edit-indicators | :white_check_mark: | :question: |
| POST /models/:modelId/edit-edges | :construction: | :question: |





## Use Swagger-UI
docker run -p 80:8080 -e SWAGGER_JSON=/api.yml -v $(pwd)/api.yml:/api.yml swaggerapi/swagger-ui

