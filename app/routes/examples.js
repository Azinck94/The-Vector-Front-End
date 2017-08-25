import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findAll('example');
  },
  actions: {
    createExample (example) {
      let newExample = this.get('store').createRecord('example', example);
        newExample.save();
    },
    deleteExample (example) {
      example.destroyRecord();
     }
  },
});
