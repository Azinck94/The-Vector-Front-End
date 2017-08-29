import Ember from 'ember';

export default Ember.Component.extend({
  newCustomer: {
    title: null,
    hidden: false
  },
  actions: {
    createCustomer () {
      this.sendAction('createCustomer', this.get('newCustomer'));
      this.set('newCustomer.title', null);
     }
  }
});
