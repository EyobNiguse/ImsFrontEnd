import axios from "axios";
const getDrivers = ()=>{
    var config = {
        method: 'get',
        url: 'http://localhost/ims/api/v1/driver/list_drivers',
        headers: { }
      };
      
      return axios(config)
}
const addDriver = (data)=>{
    var config = {
        method: 'post',
        url: 'http://localhost/ims/api/v1/driver/add_driver',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
    return   axios(config)
}
const updateDriver = (data)=>{
  var config = {
    method: 'put',
    url: 'http://localhost/ims/api/v1/driver/update_driver',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
}
const removeDriver= (data)=>{
  var config = {
    method: 'delete',
    url: 'http://localhost/ims/api/v1/driver/delete_driver',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
 return  axios(config)
}
export default {
    getDrivers,
    addDriver,
    updateDriver,
    removeDriver,
}