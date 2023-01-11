setup:
	make -C core setup
	make -C front setup

build:
	make -C front build

run:
	make -C front run

.PHONY: setup, build, run
