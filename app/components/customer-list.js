import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['customer'],
  classNameBindings: ['customerDetailHidden'],
  customerDetailHidden: false,
  newInfo: {
    content: null,
    done: false
  },
  actions: {
    toggleInfoDone (info) {
        return this.sendAction('toggleInfoDone', info);
    },
    toggleCustomerDetail () {
      return this.toggleProperty('customerDetailHidden');
    },
    deleteInfo (info) {
       return this.sendAction('deleteInfo', info);
     },
     createInfo () {
       let info = this.get('newInfo');
       info.customer = this.get('customer');
       this.sendAction('createInfo', info);
       this.set('newInfo.content', null);
      }
  },
});
