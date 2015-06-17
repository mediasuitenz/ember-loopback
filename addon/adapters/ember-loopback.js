import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  defaultSerializer: 'ember-loopback/serializers/ember-loopback',

  /**
   * Serializes the query params as a json because loopback has some funky crazy syntax
   * @see http://docs.strongloop.com/display/public/LB/Querying+data
   *
   * @private
   * @override
   *
   * @param url The request URL
   * @param type request method
   * @param options ???
   * @returns {object} the modified hash
   */
  ajaxOptions: function (url, type, options) {

    var hash = this._super(url, type, options);
    console.info('ajaxOptions: ', url, type, options, '-->', hash);

    // TODO: this should also check for filters, etc..., and not just a where clause
    if (type === 'GET' && !!hash.data && !!hash.data.where) {
      hash.url = hash.url + '?filter=' + encodeURIComponent(JSON.stringify(hash.data));
      delete hash.data.where;
    }

    return hash;
  },

  // @override
  pathForType: function (type) {
    return Ember.String.underscore(type).pluralize();
  },

  // @override
  ajaxError: function (jqXHR, responseText, errorThrown) {
    var error = this._super(jqXHR, responseText, errorThrown);

    if (jqXHR && jqXHR.status === 422) {
      // 422 Unprocessable Entity, aka validation error.
      return new DS.InvalidError(Ember.$.parseJSON(jqXHR.responseText));
    } else {
      return error;
    }
  }
});
