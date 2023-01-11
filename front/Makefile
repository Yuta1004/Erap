IMAGE := node:18-alpine3.15

SRCS := $(shell find public/) \
		$(shell find src/ -name "*.tsx") \
		$(shell find ../core/src -name "*.rs")

setup: package.json
	mkdir -p orig_modules/erap_core
	docker run --rm -it -v $(shell pwd):/workdir -w /workdir $(IMAGE) /bin/sh -c "\
		npm install \
	"

build: package.json $(SRCS)
	make -C ../core build
	cp -r ../core/pkg/* orig_modules/erap_core
	docker run --rm -it -v $(shell pwd):/workdir -w /workdir $(IMAGE) /bin/sh -c "\
		npm run build \
	"

run:
	docker run --rm -it -v $(shell pwd):/workdir -w /workdir -p 53000:3000 $(IMAGE) /bin/sh -c "\
		npm run start \
	"

.PHONY: run
