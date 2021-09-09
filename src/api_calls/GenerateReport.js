import axios from "axios";
const generate_report = (data) =>{
    
    var config = {
        method: "post",
        url: "/api/report/get_all_report",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      return axios(config);
}
const generateReport = (data)=>{
    var config = {
        method: "post",
        url: "/api/report/get_all_report",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      return axios(config);
}
export default {
    generate_report, 
    generateReport  
}