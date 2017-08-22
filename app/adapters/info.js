import ApplicationAdapter from './application';

 export default ApplicationAdapter.extend({
   createRecord(store, type, record){
     const api = this.get('host');
     const serialized = this.serialize(record, {includeID: true});
     const customerId = serialized.customer_id;
     const url = `${api}/customers/${customerId}/infos`;
     const data = {info: serialized};
     return this.ajax(url, 'POST', {data});
   }
 });
