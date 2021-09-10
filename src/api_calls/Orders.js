import axios from "axios";
const dt = localStorage.getItem("accessToken")||"";

const getSalesOrders = ()=>{
    var config = {
        method: 'get',
        url: '/api/get_sales_orders',
        headers: {  Authorization: `Bearer ${dt}` }
      };
      
      return axios(config);
    }
const addSalesOrder = (data)=>{
    var config = {
        method: 'post',
        url: '/api/order/make_order',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data : data
      };
      
    return  axios(config)
}
const removeOrder  = (id)=>{
    var config = {
        method: 'delete',
        url: `/api/order/delete_order/${id}`,
        headers: {  Authorization: `Bearer ${dt}` }
      };
      
    return  axios(config);

}
const UpdateOrder = (data)=>{
  var config = {
    method: 'put',
    url: '/api/order/update_order',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data : data
  };
  return axios(config);
}
const updateOrderItem = (data)=>{
  var config = {
    method: 'put',
    url: '/api/order/update_order_list',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data : data
  };
  
 return axios(config)
}
const removeItemList = (id)=>{
 const data = '';
  var config = {
    method: 'delete',
    url: `/api/order/delete_order_list/${id}`,
    headers: {  Authorization: `Bearer ${dt}` },
    data : data
  };
  
  return axios(config)
}
export default {
    getSalesOrders,
    addSalesOrder,
    UpdateOrder,
    updateOrderItem,
    removeItemList,
    removeOrder
}