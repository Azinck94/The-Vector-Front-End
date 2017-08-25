import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    editCustomer () {
      this.sendAction('editCustomer', this.get('customer'));
      // this.set('customer.name', null);
      // this.set('customer.phone', null);
      // this.set('customer.email', null);
    }
  }
});
