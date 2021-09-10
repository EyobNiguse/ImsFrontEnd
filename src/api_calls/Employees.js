import axios from "axios";
const dt = localStorage.getItem("accessToken")||"";

// get Employees
const getEmployees = ()=>{
    var config = {
        method: 'get',
        url: '/api/employee/list_employees',
        headers: { Authorization: `Bearer ${dt}` }
      };
      
      return axios(config)
}

// add Employee 
const addEmployee = (data)=>{
    var config = {
        method: 'post',
        url: '/api/employee/add_employee',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dt}`
        },
        data : data
      };
      
      return axios(config)
}
const updateEmployee = (data)=>{
  var config = {
    method: 'put',
    url: '/api/employee/update_employee',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
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
       url: '/api/employee/delete_employee',
       headers: { 
       'Content-Type': 'application/json',
       Authorization: `Bearer ${dt}`
       },
      data : data
};

return axios(config);
}
const activateEmployee = (data)=>{
  var config = {
    method: 'post',
    url: '/api/employee/activate_employee',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data : data
  };
  
 return  axios(config);
}
const deactivateEmployee=(data)=>{

  var config = {
    method: 'post',
    url: '/api/employee/deactivate_employee',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${dt}`
    },
    data : data
  };
  
   
  return axios(config);

}
export default {
    getEmployees,
    addEmployee,
    updateEmployee,
    removeEmployee,
    activateEmployee,
    deactivateEmployee
}