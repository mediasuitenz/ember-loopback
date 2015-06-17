import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  /**
   * This doesn't need to return anything... It is meant to mutate the data param
   * @param hash An empty object
   * @param type
   * @param record
   * @param options
   */
  serializeIntoHash: function (hash, type, record, options) {
    var serialized = this.serialize(record, options);
    console.log('serializing into hash...', hash, type, record, options, serialized);

    Ember.merge(hash, serialized);
  },

  extract: function (store, type, payload, id, requestType) {
    var newPayload = {};
    // DEPRECATED: typekey
    newPayload[type.typeKey] = payload;

    return this._super(store, type, newPayload, id, requestType);
  }

});
