import Ember from 'ember';


export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('customer', params.customer_id);
  },
  actions: {
   editCustomer (customer) {
      customer.save();
      this.transitionTo('customer');
    }
  }
});
