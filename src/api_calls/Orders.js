import axios from "axios";

const getSalesOrders = ()=>{
    var config = {
        method: 'get',
        url: 'http://localhost/ims/api/v1/get_sales_orders',
        headers: { }
      };
      
      return axios(config);
    }
const addSalesOrder = (data)=>{
    var config = {
        method: 'post',
        url: 'http://localhost/ims/api/v1/order/make_order',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
    return  axios(config)
}
const removeOrder  = (id)=>{
    var config = {
        method: 'delete',
        url: `http://localhost/ims/api/v1/order/delete_order/${id}`,
        headers: { }
      };
      
    return  axios(config);

}
const UpdateOrder = (data)=>{
  var config = {
    method: 'put',
    url: 'http://localhost/ims/api/v1/order/update_order',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  return axios(config);
}
const updateOrderItem = (data)=>{
  var config = {
    method: 'put',
    url: 'http://localhost/ims/api/v1/order/update_order_list',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
 return axios(config)
}
const removeItemList = (id)=>{
 const data = '';
  var config = {
    method: 'delete',
    url: `http://localhost/ims/api/v1/order/delete_order_list/${id}`,
    headers: { },
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