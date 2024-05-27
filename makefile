GIT_COMMIT := $(shell git rev-parse HEAD)

build: 
	docker build -t argeegabrielii/nest-socket-server:$(GIT_COMMIT) .
	docker push argeegabrielii/nest-socket-server:$(GIT_COMMIT)
	docker push argeegabrielii/nest-socket-server:latest

start:
	clear
	docker run \
		--rm \
		--network none \
		--memory 1g \
		-v $$(pwd)/sock:/var/run/dev-test \
		argeegabrielii/nest-socket-server /var/run/dev-test/sock