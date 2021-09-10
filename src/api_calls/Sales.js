import axios from "axios";
const dt = localStorage.getItem("accessToken")||"";
const getSales = ()=>{
    var config = {
        method: 'get',
        url: '/api/get_refs',
        headers: {   Authorization: `Bearer ${dt}`}
      };
      
     return  axios(config)

}
const addSales = (data)=>{
   
    var config = {
        method: 'post',
        url: '/api/purchase/make_sales',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data :data
      };
      
    return  axios(config)
}

const removeSales = (id)=>{
    const data = {
        "REFNO":id
    }
    var config = {
        method: 'delete',
        url: '/api/purchase/delte_ref',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data : data
      };
      
     return axios(config)
}
const updateSale = (data)=>{
  var config = {
    method: 'put',
    url: '/api/purchase/update_ref',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data : data
  };
  
  return axios(config);
}
const updateSaleItem = (data)=>{
  var config = {
    method: 'put',
    url: '/api/purchase/update_sales',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data : data
  };
  
 return axios(config)
}
const removeItem = (data)=>{
  var config = {
    method: 'delete',
    url: '/api/purchase/delete_sales',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data : data
  };
  
 return axios(config)
}
 
export default {
    getSales,
    addSales,
    removeSales,
    updateSale,
    updateSaleItem,
    removeItem
  }