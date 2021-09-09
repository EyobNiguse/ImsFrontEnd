var axios = require('axios');


const getCategories =  ()=>{
  var config = {
    method: 'get',
    url: 'http://localhost/ims/api/v1/category/getcategories',
    headers: { }
  };
 
  return axios(config)
}
const addCategory = (data)=>{
  var config = {
    method: 'post',
    url: 'http://localhost/ims/api/v1/category/addcategory',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
}
const updateCategory = (data)=>{
  var config = {
    method: 'put',
    url: 'http://localhost/ims/api/v1/category/update_category',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
}
const removeCategory = (data)=>{
  var config = {
    method: 'delete',
    url: 'http://localhost/ims/api/v1/category/delete_category',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)

}
export default {
  getCategories,
  addCategory,
  updateCategory,
  removeCategory
  
}
