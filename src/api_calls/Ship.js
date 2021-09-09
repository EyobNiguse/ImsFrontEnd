import axios from  "axios";
const dt = localStorage.getItem("accessToken")||"";

const getAllShipment = ()=>{
    var config = {
        method: 'get',
        url: '/api/transfered_Items_List',
        headers: { Authorization: `Bearer ${dt}` }
      };
      
      return axios(config)
} 
const updateShipment  = (data)=>{
    var config = {
        method: 'put',
        url: '/api/purchase/update_teid',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data : data
      };
      
     return axios(config)
}
const removeShipment = (data)=>{
    var config = {
        method: 'delete',
        url: '/api/purchase/delete_teid',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data : data
      };
      
return axios(config);
}
const updateShipmentItem = (data)=>{
  var config = {
    method: 'put',
    url: '/api/purchase/update_transferd_count',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data : data
  };
  
  return axios(config)
}
 const removeShipmentItem = (data)=>{
  var config = {
    method: 'delete',
    url: '/api/purchase/delete_transfered_item',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data : data
  };
  
 return axios(config)
 } 
export default {
getAllShipment,
updateShipment,
removeShipment,
updateShipmentItem,
removeShipmentItem
}