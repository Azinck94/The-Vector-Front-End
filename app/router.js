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
  this.route('customers', function() {
    this.route('customer', { path: ':customer_id'}); //customer/3
    this.route('new');
  });
});

export default Router;
