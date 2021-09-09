import axios from  "axios";
const getAllShipment = ()=>{
    var config = {
        method: 'get',
        url: '/api/transfered_Items_List',
        headers: { }
      };
      
      return axios(config)
} 
export default {
getAllShipment
}