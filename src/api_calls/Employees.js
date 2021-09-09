import axios from "axios";

// get Employees
const getEmployees = ()=>{
    var config = {
        method: 'get',
        url: 'http://localhost/ims/api/v1/employee/list_employees',
        headers: { }
      };
      
      return axios(config)
}

// add Employee 
const addEmployee = (data)=>{
    var config = {
        method: 'post',
        url: 'http://localhost/ims/api/v1/employee/add_employee',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config)
}
const updateEmployee = (data)=>{
  var config = {
    method: 'put',
    url: 'http://localhost/ims/api/v1/employee/update_employee',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
}
const removeEmployee = (id)=>{
  const data = {
    "EmployeeId":id
}
  var config = {
       method: 'delete',
       url: 'http://localhosthttp://localhost/ims/api/v1/employee/delete_employee',
       headers: { 
       'Content-Type': 'application/json'
       },
      data : data
};

return axios(config);
}
export default {
    getEmployees,
    addEmployee,
    updateEmployee,
    removeEmployee
}