import axios from "axios";
const login = (data)=>{
    var config = {
        method: 'post',
        url: '/api/login',
        headers: { 
          'Content-Type': 'application/json',
        },
        data : data
      };
      
     return  axios(config)
}
export default {
    login
}