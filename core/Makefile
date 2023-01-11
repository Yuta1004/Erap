IMAGE := erap/core:build

SRCS := $(shell src/ -name "*.rs")

setup: Cargo.toml
	docker build -t $(IMAGE) .

build: Cargo.toml $(SRCS)
	docker run --rm -v $(shell pwd):/workdir $(IMAGE) \
		wasm-pack build --release --target web --features wasm
	sudo chown $(shell id -u):$(shell id -g) pkg pkg/*
