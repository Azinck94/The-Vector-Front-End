import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['listInfoCompleted'],
  listInfoCompleted: Ember.computed.alias('info.done'),
  actions: {
    toggleDone () {
      return this.sendAction('toggleDone', this.get('info'));
    },
    deleteInfo () {
      return this.sendAction('deleteInfo', this.get('info'));
     }
  },
});
