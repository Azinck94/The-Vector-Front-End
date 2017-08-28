import Ember from 'ember';


export default Ember.Route.extend({

  model (params) {
    return this.get('store').findRecord('customer', params.customer_id);
  },
  actions: {
   editCustomer (customer) {
      customer.save()
      .then(() => {
        this.get('flashMessages').warning('Customer Edited');
      })
      .catch(() => {
        this.get('flashMessages')
        .danger('You dont have permission to edit this customer');
      });
      // this.transitionTo('customers');
    }
  }
});
