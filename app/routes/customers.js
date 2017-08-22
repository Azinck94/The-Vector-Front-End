import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findAll('customer')
  },
  actions: {
    createCustomer (customer) {
      let newCustomer = this.get('store').createRecord('customer', customer);
        newCustomer.save()
    },
    deleteCustomer (customer) {
      customer.destroyRecord();
     }
  },
});
