import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('users');
  this.route('customers');
  this.route('customer', { path: '/customers/:customer_id' });
  this.route('new');
  this.route('new');
  this.route('edit', { path: '/customers/:customer_id/edit' });
  this.route('examples');
  this.route('example', { path: '/examples/:example_id' });
});

export default Router;
