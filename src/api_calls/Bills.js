import axios from "axios";
const getAllExpenseList = () => {
  var config = {
    method: 'get',
    url: 'http://localhost/ims/api/v1/expence/BL/get_BL',
    headers: {}
  };

  return axios(config)
}
const getAllBillTypes = () => {

  var config = {
    method: 'get',
    url: 'http://localhost/ims/api/v1/expence/BT/get_BT',
    headers: {}
  };

  return axios(config)
}
const addBillType = (data) => {
  var config = {
    method: 'post',
    url: 'http://localhost/ims/api/v1/expence/BT/add_BT',
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
    url: 'http://localhost/ims/api/v1/expence/BL/add_BL',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)
}
const removeBillExpense = (id) => {
  var config = {
    method: 'delete',
    url: `http://localhost/ims/api/v1/expence/BL/delete_BL/${id}`,
    headers: {}
  };
  return axios(config);
}
const removeBillType = (id) => {
  var config = {
    method: 'delete',
    url: `http://localhost/ims/api/v1/expence/BT/delete_BT/${id}`,
    headers: {}
  };

  return axios(config)
}
const updateBillExpense = (data) => {
  var config = {
    method: 'put',
    url: 'http://localhost/ims/api/v1/expence/BL/update_BL',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
}
const updateBillType = (data)=>{
  var config = {
    method: 'put',
    url: 'http://localhost/ims/api/v1/expence/BT/update_BT',
    headers: { 
      'Content-Type': 'application/json'
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