import axios from "axios";
const dt = localStorage.getItem("accessToken")||"";

const getRentExpenses = ()=>{
    var config = {
        method: 'get',
        url: '/api/expence/rent/get_rents',
        headers: {  Authorization: `Bearer ${dt}` }
      };
      
    return axios(config)  
}
const addRentExpense = (data)=>{
    var config = {
        method: 'post',
        url: '/api/expence/rent/add_rent',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data : data
      };
      
 return  axios(config)
}
const updateRentExpense = (data)=>{
    var config = {
        method: 'put',
        url: '/api/expence/rent/update_rent',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data : data
      };
      
      return axios(config);
}
const deleteRentExpense = (data)=>{
    var config = {
        method: 'delete',
        url: '/api/expence/rent/delete_rent',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
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