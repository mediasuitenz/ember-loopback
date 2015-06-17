import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  /**
   * This doesn't need to return anything... It is meant to mutate the data param
   * This is a really weird way of doing things ember... What were you thinking?
   * @param hash An empty object
   * @param type
   * @param record
   * @param options
   */
  serializeIntoHash: function (hash, type, record, options) {
    var serialized = this.serialize(record, options);
    Ember.merge(hash, serialized);
  },

  extract: function (store, type, payload, id, requestType) {
    var newPayload = {};
    // I got a warning saying that typeKey was deprecated, but I don't see it anymore
    newPayload[type.typeKey] = payload;
    return this._super(store, type, newPayload, id, requestType);
  }

});
