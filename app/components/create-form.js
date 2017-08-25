import Ember from 'ember';

export default Ember.Component.extend({
  newExample: {
    text: null,
    hidden: false
  },
  actions: {
    createExample () {
      this.sendAction('createExample', this.get('newExample'))
      this.set('newExample.text', null);
     }
  }
});
