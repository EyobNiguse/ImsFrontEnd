import axios from  "axios";
const getAllShipment = ()=>{
    var config = {
        method: 'get',
        url: 'http://localhost/ims/api/v1/transfered_Items_List',
        headers: { }
      };
      
      return axios(config)
} 
const updateShipment  = (data)=>{
    var config = {
        method: 'put',
        url: 'http://localhost/ims/api/v1/purchase/update_teid',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
     return axios(config)
}
const removeShipment = (data)=>{
    var config = {
        method: 'delete',
        url: 'http://localhost/ims/api/v1/purchase/delete_teid',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
return axios(config);
}
export default {
getAllShipment,
updateShipment,
removeShipment
}