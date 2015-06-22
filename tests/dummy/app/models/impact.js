import DS from 'ember-data';

export default DS.Model.extend({
  notes: DS.attr('string'),
  updatedAt: DS.attr('string'),
  histories: DS.hasMany('impact-history', {inverse: 'impact'}),
  projectStage: DS.belongsTo('project-stage')
});
