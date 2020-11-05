# Run this web app with dokcer
## Build docker image in current folder
```bash
docker build -t react-docker-app .
```
## Run docker container
```bash
docker run -it --rm \
-v ${PWD}:/app \
-v /app/node_modules \
-p 8080:3000 \
-e CHOKIDAR_USEPOLLING=true \
react-docker-app
```
## Open web app in browser
```bash
https://127.0.0.1:8080
```
