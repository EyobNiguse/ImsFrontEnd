import axios from "axios";
const dt = localStorage.getItem("accessToken")||"";
const getAllExpenseList = () => {
  var config = {
    method: 'get',
    url: '/api/expence/BL/get_BL',
    headers: { Authorization: `Bearer ${dt}`}
  };

  return axios(config)
}
const getAllBillTypes = () => {

  var config = {
    method: 'get',
    url: '/api/expence/BT/get_BT',
    headers: { Authorization: `Bearer ${dt}`}
  };

  return axios(config)
}
const addBillType = (data) => {
  var config = {
    method: 'post',
    url: '/api/expence/BT/add_BT',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)
}
const addBillExpense = (data) => {
  var config = {
    method: 'post',
    url: '/api/expence/BL/add_BL',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data: data
  };

  return axios(config)
}
const removeBillExpense = (id) => {
  var config = {
    method: 'delete',
    url: `/api/expence/BL/delete_BL/${id}`,
    headers: { Authorization: `Bearer ${dt}`}
  };
  return axios(config);
}
const removeBillType = (id) => {
  var config = {
    method: 'delete',
    url: `/api/expence/BT/delete_BT/${id}`,
    headers: { Authorization: `Bearer ${dt}`}
  };

  return axios(config)
}
const updateBillExpense = (data) => {
  var config = {
    method: 'put',
    url: '/api/expence/BL/update_BL',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data : data
  };
  
  return axios(config)
}
const updateBillType = (data)=>{
  var config = {
    method: 'put',
    url: '/api/expence/BT/update_BT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data : data
  };
  
  return axios(config)
}
export default {
  addBillType,
  addBillExpense,
  getAllExpenseList,
  getAllBillTypes,
  removeBillExpense,
  removeBillType,
  updateBillExpense,
  updateBillType
}