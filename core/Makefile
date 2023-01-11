IMAGE := erap/core:build

setup: Cargo.toml
	docker build -t $(IMAGE) .

build: src/ Cargo.toml
	docker run --rm -v $(shell pwd):/workdir $(IMAGE) \
		wasm-pack build --release --target web
	sudo chown $(shell id -u):$(shell id -g) pkg pkg/*
