var testInfo = require('ember-cli/lib/utilities/test-info');

module.exports = {
  description: 'Generates an ember-data loopback-adapter unit test',
  locals: function(options) {
    return {
      friendlyTestDescription: testInfo.description(options.entity.name, "Unit", "LoopbackAdapter")
    };
  }
};
