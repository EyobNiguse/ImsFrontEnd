import axios from "axios";
const addExpenseType = (data)=>{
    var config = {
        method: 'post',
        url: 'http://localhost/ims/api/v1/expence/PET/add_PET',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
     return axios(config)

}
const getAllExpenseTypeList = ()=>{
    var config = {
        method: 'get',
        url: 'http://localhost/ims/api/v1/expence/PET/get_PET',
        headers: { }
      };
      
     return axios(config)
}
const removeExpenseType= (id)=>{
    var config = {
        method: 'delete',
        url: `http://localhost/ims/api/v1/expence/PET/delete_PET/${id}`,
        headers: { }
      };
      
     return  axios(config)
}
const updateExpensetype = (data)=>{
    var config = {
        method: 'put',
        url: 'http://localhost/ims/api/v1/expence/PET/update_PET',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config)
}
const getAllExpenseList = ()=>{
    var config = {
        method: 'get',
        url: 'http://localhost/ims/api/v1/expence/PEL/get_PEL',
        headers: { }
      };
      
    return   axios(config);
}
 const updateExpense = (data)=>{
    var config = {
        method: 'put',
        url: 'http://localhost/ims/api/v1/expence/PEL/update_PEL',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config);

}
 const addPersonalExpense = (data)=>{
    var config = {
        method: 'post',
        url: 'http://localhost/ims/api/v1/expence/PEL/add_PEL',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
    return  axios(config);
 }
  const removePersonalExpense  = (id)=>{
    var config = {
        method: 'delete',
        url: `http://localhost/ims/api/v1/expence/PEL/delete_PEL/${id}`,
        headers: { }
      };
      
      return axios(config)
  }
export default {
    addExpenseType,
    getAllExpenseTypeList,
    removeExpenseType,
    updateExpensetype,
    getAllExpenseList,
    updateExpense,
    addPersonalExpense,
    removePersonalExpense
}