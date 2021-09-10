import axios from "axios";
const dt = localStorage.getItem("accessToken")||"";

const addExpenseType = (data)=>{
    var config = {
        method: 'post',
        url: '/api/expence/PET/add_PET',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data : data
      };
      
     return axios(config)

}
const getAllExpenseTypeList = ()=>{
    var config = {
        method: 'get',
        url: '/api/expence/PET/get_PET',
        headers: {   Authorization: `Bearer ${dt}` }
      };
      
     return axios(config)
}
const removeExpenseType= (id)=>{
    var config = {
        method: 'delete',
        url: `/api/expence/PET/delete_PET/${id}`,
        headers: {   Authorization: `Bearer ${dt}` }
      };
      
     return  axios(config)
}
const updateExpensetype = (data)=>{
    var config = {
        method: 'put',
        url: '/api/expence/PET/update_PET',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data : data
      };
      
      return axios(config)
}
const getAllExpenseList = ()=>{
    var config = {
        method: 'get',
        url: '/api/expence/PEL/get_PEL',
        headers: { Authorization: `Bearer ${dt}` }
      };
      
    return   axios(config);
}
 const updateExpense = (data)=>{
    var config = {
        method: 'put',
        url: '/api/expence/PEL/update_PEL',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data : data
      };
      
      return axios(config);

}
 const addPersonalExpense = (data)=>{
    var config = {
        method: 'post',
        url: '/api/expence/PEL/add_PEL',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data : data
      };
      
    return  axios(config);
 }
  const removePersonalExpense  = (id)=>{
    var config = {
        method: 'delete',
        url: `/api/expence/PEL/delete_PEL/${id}`,
        headers: {  Authorization: `Bearer ${dt}` }
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