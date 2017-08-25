import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteExample () {
      return this.sendAction('deleteExample', this.get('example'));
    }
  }
});
