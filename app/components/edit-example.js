import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    editExample () {
      this.sendAction('editExample', this.get('example'));
    }
  }
});
