import axios from "axios";
const getSales = ()=>{
    var config = {
        method: 'get',
        url: 'http://localhost/ims/api/v1/get_refs',
        headers: { }
      };
      
     return  axios(config)

}
const addSales = (data)=>{
   
    var config = {
        method: 'post',
        url: 'http://localhost/ims/api/v1/purchase/make_sales',
        headers: { 
          'Content-Type': 'application/json'
        },
        data :data
      };
      
    return  axios(config)
}

const removeSales = (id)=>{
    const dt = {
        "REFNO":id
    }
    var config = {
        method: 'delete',
        url: 'http://localhost/ims/api/v1/purchase/delte_ref',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : dt
      };
      
     return axios(config)
}
const updateSale = (data)=>{
  var config = {
    method: 'put',
    url: 'http://localhost/ims/api/v1/purchase/update_ref',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config);
}
const updateSaleItem = (data)=>{
  var config = {
    method: 'put',
    url: 'http://localhost/ims/api/v1/purchase/update_sales',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
 return axios(config)
}
const removeItem = (data)=>{
  var config = {
    method: 'delete',
    url: 'http://localhost/ims/api/v1/purchase/delete_sales',
    headers: { 
      'Content-Type': 'application/json'
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