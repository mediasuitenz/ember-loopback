# Ember-loopback

This README outlines the details of collaborating on this Ember addon.

## Installation

\> Be you
\> Be in your app's root directory
\> Run `npm install <url-to-this-package> --save` No need to run `ember g ember-loopback` because this doesn't need any setup. You can if you want to though. It won't do anything...

Example Usage:

```
\\ app/adapters/application.js
import LoopbackAdapter from 'ember-loopback/adapters/ember-loopback';
export default LoopbackAdapter.extend({
  namespace: 'api',
  host: 'http://localhost:3000',
});
```
 
## TODO
* Add some tests
* Move the example app to tests/dummy
* publish to npm
