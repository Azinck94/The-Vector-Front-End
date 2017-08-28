import Ember from 'ember';

export default Ember.Route.extend({
  flashMessages: Ember.inject.service(),

  model (params) {
    return this.get('store').findAll('customer');
  },
  actions: {
    createCustomer (customer) {
      let newCustomer = this.get('store').createRecord('customer', customer);
        newCustomer.save()
        .then(() => {
          this.get('flashMessages').warning('Customer Added')
        })
    },

    deleteCustomer (customer) {
      customer.destroyRecord();
     }
  },
});
