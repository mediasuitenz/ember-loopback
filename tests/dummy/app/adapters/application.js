import LoopbackAdapter from 'ember-loopback/adapters/ember-loopback';
import DS from 'ember-data';

export default LoopbackAdapter.extend({
  namespace: 'api',
  host: 'http://localhost:9300',
  headers: {
    'AUTHORIZATION': 'Basic ZG9yb3RoeTpwZXJraW5z'
  }
});
