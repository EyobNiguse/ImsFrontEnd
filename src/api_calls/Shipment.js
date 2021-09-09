import axios from "axios";
const dt = localStorage.getItem("accessToken")||"";

const addShipment = (data)=>{
    var config = {
        method: 'post',
        url: '/api/purchase/ship_purchase',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data : data
      };
      
      return axios(config)
}
const shipWareHouse = (data)=>{
  var config = {
    method: 'post',
    url: '/api/purchase/move_to_store',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data : data
  };
  
 return   axios(config);
}
export default{
    addShipment,
    shipWareHouse
}