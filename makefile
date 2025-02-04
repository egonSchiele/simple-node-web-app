docker-build:
	docker build -t simple-node-web-app .

docker-run:
	docker run -it --rm -p 3000:3000 simple-node-web-app
