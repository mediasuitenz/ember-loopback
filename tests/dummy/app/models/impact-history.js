import DS from 'ember-data';

export default DS.Model.extend({
  impact: DS.belongsTo('impact'),
  stageId: DS.attr('number')
});
