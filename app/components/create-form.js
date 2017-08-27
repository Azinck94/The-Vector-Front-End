import Ember from 'ember';

export default Ember.Component.extend({
  show:false,
  newCustomer: {
    name: null,
    email: null,
    phone: null,
    hidden: false
  },
  actions: {
    createCustomer () {
      this.sendAction('createCustomer', this.get('newCustomer'));
      this.set('newCustomer.name', null);
      this.set('newCustomer.phone', null);
      this.set('newCustomer.email', null);
    },
    pressed () {
      this.toggleProperty('show');
    }
  }
});
