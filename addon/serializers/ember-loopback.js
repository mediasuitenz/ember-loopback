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

  /**
   * Ember expects the API responses to be nested in a hash
   * @param store
   * @param primaryTypeClass
   * @param payload
   * @param id
   * @param requestType
   * @returns {*}
   */
  extract: function (store, primaryTypeClass, payload, id, requestType) {
    console.log('extract', payload);
    var newPayload = {};
    newPayload[primaryTypeClass.typeKey] = payload;
    return this._super(store, primaryTypeClass, newPayload, id, requestType);
  },

  extractArray: function (store, primaryTypeClass, payload) {
    var toSideLoad = {};
    var nested = [];
    var self = this;
    payload[primaryTypeClass.typeKey].forEach(function (item) {
      nested = self.extractNested(item);
      for (var key in nested) {
        if (nested.hasOwnProperty(key)) {
          // Merge the nested arrays into one giant big-as array.
          if (!toSideLoad.hasOwnProperty(key)) {
            toSideLoad[key] = nested[key];
          } else {
            toSideLoad[key] = toSideLoad[key].concat(nested[key])
          }
        }
      }
    });

    Ember.merge(payload, toSideLoad);
    console.log('--> payload', payload);
    return this._super(store, primaryTypeClass, payload);
  },

  extractSimple: function (store, primaryTypeClass, payload, recordId) {
    Ember.merge(payload, self.extractNested(payload));
    return this._super(store, primaryTypeClass, payload, recordId);
  },

  /**
   * Identifies any nested relations, replaces them with just the id, and returns
   * a list of the original nested object(s), even if it's just a single object.
   *
   * @param obj
   * @returns {Array}
   */
  extractNested: function (obj) {
    var nestedObjects = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var val = obj[key];
        if (isArray(val) && val.length && isNestedRelation(val[0])) {
          obj[key] = val.map(function(i) {return i.id});
          nestedObjects[key] = val
        } else if (isNestedRelation(val)) {
          obj[key] = val.id;
          nestedObjects[key] = [val];
        }
      }
    }
    return nestedObjects;
  }

});

/**
 * Maybe this can be more robust?
 * @param item
 * @returns {boolean}
 */
function isArray(item) {
  return typeof item === 'object' && !!item && item.hasOwnProperty('length')
}

/**
 * We only consider an object to be a nested relation if it's an object with an id
 * @param item
 * @returns {boolean}
 */
function isNestedRelation(item) {
  return typeof item === 'object' && !!item && item.hasOwnProperty('id');
}
