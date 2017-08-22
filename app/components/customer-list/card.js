import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteCustomer () {
      return this.sendAction('deleteCustomer', this.get('customer'));
    }
  }
});
