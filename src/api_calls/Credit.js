import axios from "axios";
const getGRNsettlements = ()=>{
    var config = {
        method: 'get',
        url: '/api/creaditSettlemnt/GRN/list_all_credit_settlements',
        headers: { }
      };
      
     return  axios(config)
}
const addGRNCreditSettlement = (data)=>{
    var config = {
        method: 'post',
        url: '/api/creaditSettlemnt/GRN/add_credit_settlemnts',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config)
}
 
const updateGRNCreditSettlement = ()=>{}
const updateGRNCredit = (data)=>{
var config = {
  method: 'put',
  url: '/api/creaditSettlemnt/GRN/update_credit_settlemt',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

 return axios(config);
}
const getcreditSettlement = (id)=>{
  var config = {
    method: 'get',
    url: `/api/creaditSettlemnt/GRN/list_credit_settlement/${id}`,
    headers: { }
  };
  
  return axios(config)
}
const removeCreditSettlement = (data)=>{
  

  var config = {
    method: 'delete',
    url: '/api/creaditSettlemnt/GRN/delete_credit_settlemnts',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
}

// sales Credit
 const addREFCreditSettlement = (data)=>{
  var config = {
    method: 'post',
    url: '/api/creaditSettlemnt/REF/add_credit_settlemnts',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
 }
const getREFsettlements = ()=>{
  var config = {
    method: 'get',
    url: '/api/creaditSettlemnt/REF/list_all_credit_settlements',
    headers: { }
  };
  
 return  axios(config)
}
const getcreditSettlementREF = (id)=>{
  var config = {
    method: 'get',
    url: `/api/creaditSettlemnt/REF/list_credit_settlement/${id}`,
    headers: { }
  };
  
  return axios(config)
}
const updateREFCredit = (data)=>{
  var config = {
    method: 'put',
    url: '/api/creaditSettlemnt/REF/update_credit_settlemt',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config);
}
const removeCreditSettlementREF  = (data)=>{
  var config = {
    method: 'delete',
    url: '/api/creaditSettlemnt/REF/delete_credit_settlemnts',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios(config)
}
export default{
   getGRNsettlements,
   getREFsettlements,
   updateGRNCreditSettlement, 
   updateGRNCredit,
   addGRNCreditSettlement,
   getcreditSettlement,
   removeCreditSettlement,
   addREFCreditSettlement,
   getcreditSettlementREF,
   updateREFCredit,
   removeCreditSettlementREF
}