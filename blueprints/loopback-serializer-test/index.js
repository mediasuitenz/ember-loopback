/*jshint node:true*/

var testInfo = require('ember-cli/lib/utilities/test-info');

module.exports = {
  description: 'Generates a loopback-serializer unit test.',
  locals: function(options) {
    return {
      friendlyTestDescription: testInfo.description(options.entity.name, "Unit", "LoopbackSerializer")
    };
  }
};
