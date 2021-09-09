import axios from "axios";
const getRentExpenses = ()=>{
    var config = {
        method: 'get',
        url: 'http://localhost/ims/api/v1/expence/rent/get_rents',
        headers: { }
      };
      
    return axios(config)  
}
const addRentExpense = (data)=>{
    var config = {
        method: 'post',
        url: 'http://localhost/ims/api/v1/expence/rent/add_rent',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
 return  axios(config)
}
const updateRentExpense = (data)=>{
    var config = {
        method: 'put',
        url: 'http://localhost/ims/api/v1/expence/rent/update_rent',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config);
}
const deleteRentExpense = (data)=>{
    var config = {
        method: 'delete',
        url: 'http://localhost/ims/api/v1/expence/rent/delete_rent',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
 return axios(config);
}
export default  {
    getRentExpenses,
    addRentExpense,
    updateRentExpense,
    deleteRentExpense
}