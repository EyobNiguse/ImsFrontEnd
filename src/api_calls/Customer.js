import axios from "axios";

const getCustomers = ()=>{
    var config = {
        method: 'get',
        url: 'http://localhost/ims/api/v1/customer/list_customers',
        headers: { }
      };
      
      return axios(config);
}
const addCustomer=(data)=>{
    var config = {
        method: 'post',
        url: 'http://localhost/ims/api/v1/customer/add_customer',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config)
}
const updateCustomerBank = (data)=>{
  var config = {
    method: 'put',
    url: 'http://localhost/ims/api/v1/customer/update_customer_bankaccount',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config);

}
const removeCustomerBank  = (id)=>{
  var config = {
    method: 'delete',
    url: `http://localhost/ims/api/v1/customer/delete_customer_bankaccount/${id}`,
    headers: { }
  };
  
  return axios(config);

}
const addBankAccount = (data)=>{
  var config = {
    method: 'post',
    url: 'http://localhost/ims/api/v1/customer/add_customer_bankaccount',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
}
 const updateCustomer = (data)=>{
  var config = {
    method: 'put',
    url: 'http://localhost/ims/api/v1/customer/update_customer',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
 }
const removeCustomer = (data)=>{
  var config = {
    method: 'delete',
    url: 'http://localhost/ims/api/v1/customer/delete_customer',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config);
}
export default {
    getCustomers,
    addCustomer,
    updateCustomerBank,
    removeCustomerBank,
    addBankAccount,
    updateCustomer,
    removeCustomer
}