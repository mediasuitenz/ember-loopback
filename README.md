# Ember-loopback

This addon enables the use of [Loopback](loopback.io) 
as an API backend. The addon is compatible with ember-cli version 0.2.7 and Ember Data v???

## Installation

### Via ember-cli

* `ember install ember-loopback`

### Via Github

* `npm install https://github.com/mediasuitenz/ember-loopback.git --save`

## Usage

After installing, you can use the provided blueprints to extend the adapter and serializer.

* `ember g loopback-adapter <adapter-name>`
* `ember g loopback-serializer <serializer-name>`

The adapter uses the `loopback-serializer` as its defaultSerializer.


## TODO
* Add some tests
* Move the example app to tests/dummy
* publish to npm
* blueprints should support pod structure
* better docs


## References
See [Ember Django Adapter](https://github.com/dustinfarris/ember-django-adapter) for inspiration
