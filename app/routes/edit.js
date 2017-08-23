import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    return this.get('store').findRecord('customer', params.customer_id);
  },
  actions: {
   editCustomer (customer) {
      console.log(customer.title)
      list.save()
      this.transitionTo('customers')
    }
  }
});
