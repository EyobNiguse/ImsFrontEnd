import axios from "axios";
const getAllPersonnalAccounts = ()=>{
    

    var config = {
        method: 'get',
        url: 'http://localhost/ims/api/v1/personalBankAccount/Accounts',
        headers: { }
      };
      
      return axios(config)
}
const addPersonlaAccount = (data)=>{
    var config = {
        method: 'post',
        url: 'http://localhost/ims/api/v1/personalBankAccount/add_bank_account',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
     return  axios(config)
}
const addTransaction = (data)=>{
    var config = {
        method: 'post',
        url: 'http://localhost/ims/api/v1/personalBankAccount/add_transaction',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config)

}
 const getTransaction= (id)=>{
    var config = {
        method: 'get',
        url: ` http://localhost/ims/api/v1/personalBankAccount/getBankAccount_transactions/${id}`,
        headers: { }
      };
      
     return  axios(config)
 }
 const removeBankAccount = (data)=>{
  var config = {
    method: 'delete',
    url: 'http://localhost/ims/api/v1/personalBankAccount/delete_bank_account',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
 }
  const removeTransaction = (data)=>{
    var config = {
      method: 'delete',
      url: 'http://localhost/ims/api/v1/personalBankAccount/delete_transaction',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    return axios(config)
  }
  const updateBank = (data)=>{
    var config = {
      method: 'put',
      url: 'http://localhost/ims/api/v1/personalBankAccount/update_bank_account',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    return axios(config)
  }
 export default {
    getAllPersonnalAccounts,
    addPersonlaAccount,
    addTransaction,
    getTransaction,
    removeBankAccount,
    removeTransaction,
    updateBank

 }