import axios from "axios";
const dt = localStorage.getItem("accessToken")||"";

const generate_report = (data) =>{
    
    var config = {
        method: "post",
        url: "/api/report/get_all_report",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dt}`
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
          Authorization: `Bearer ${dt}`
        },
        data: data,
      };
      return axios(config);
}
export default {
    generate_report, 
    generateReport  
}