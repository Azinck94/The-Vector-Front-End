import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  done: DS.attr('boolean'),
  customer: DS.belongsTo('customer')
});
