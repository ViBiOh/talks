SHELL = /bin/bash

ifneq ("$(wildcard .env)","")
	include .env
	export
endif

APP_NAME = algolia
PACKAGES ?= ./...

.DEFAULT_GOAL := app

## help: Display list of commands
.PHONY: help
help: Makefile
	@sed -n 's|^##||p' $< | column -t -s ':' | sort

## app: Build whole app
.PHONY: app
app: deps dev

## dev: Build app
.PHONY: dev
dev: format lint build

## name: Output name of app
.PHONY: name
name:
	@echo -n $(APP_NAME)

## version: Output sha1 of last commit
.PHONY: version
version:
	@echo -n $(shell git rev-parse --short HEAD)

## deps: Download dependencies
.PHONY: deps
deps:
	@curl -q -sSL --max-time 10 "https://raw.githubusercontent.com/ViBiOh/scripts/master/bootstrap" | bash -s "git_hooks"
	go get github.com/kisielk/errcheck
	go get golang.org/x/lint/golint
	go get golang.org/x/tools/cmd/goimports
	go mod tidy

## format: Format code. e.g Prettier (js), format (golang)
.PHONY: format
format:
	goimports -w **/*.go
	gofmt -s -w **/*.go

## lint: Lint code of app
.PHONY: lint
lint:
	golint $(PACKAGES)
	errcheck -ignoretests $(PACKAGES)
	go vet $(PACKAGES)

## build: Build the application.
.PHONY: build
build:
	CGO_ENABLED=0 go build -ldflags="-s -w" -installsuffix nocgo -o bin/$(APP_NAME) cmd/algolia.go
