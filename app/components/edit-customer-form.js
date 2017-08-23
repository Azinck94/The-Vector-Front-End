import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    editCustomer () {
      this.sendAction('editCustomer', this.get('customer'));
    }
  }
});
