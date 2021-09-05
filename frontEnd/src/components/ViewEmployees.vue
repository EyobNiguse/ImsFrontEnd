<template>
    <div>
            <div class="router-view-container">
                <SubHeaderControl :links="links"/>
            <div class="router-view">
                <div class="add-purchase">
                <vue-window-modal :active="editVisible" title="Update Employee Details" v-on:clickClose="closeUpdate(false)" style="width:auto;height:auto;">
                         <form @submit.prevent="updateEmployee">
                         <table class="view-items">
                        <tr class="view-items-header">
                            <th>
                                Name  
                            </th>
    
                            <th>
                                Phone
                            </th>
                            <th>
                                Address
                            </th>
                        </tr>
                        <tr :key="x.EmployeeID" v-for="x in employeeEditable" >
                            <td>
                                <input  v-model="editName" type="text" placeholder="employee Name" required/>
                            </td>
                         
                            <td>
                                <input  v-model="editPhone" type="text" placeholder="employee Phone" required/>

                            </td>
                            <td>
                                    <input v-model="editAddress" type="text"   placeholder="Employee Address" requried/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button class="btn-submit" type="submit">
                                    Confirm
                                 </button>
                            </td>
                        </tr>
                         </table>
                         </form>          
                         </vue-window-modal>
                    
                <fieldset class="view-items-container">
                    <legend> <h3> Employees </h3></legend>
                    <table class="view-items">
                        <tr class="view-items-header">
                            <th>
                                Name  
                            </th>
                            <th>
                                 Password
                            </th>
                            <th>
                                Phone
                            </th>
                            <th>
                                Address
                            </th>
                            <th>
                                CHANGE
                            </th>
                        </tr>
                      <tr  :name="x.EmployeeID" v-bind:key="index" v-for="(x,index) in items">  
                          <td> {{x.EmployeeName}}</td>
                          <td>{{x.EmployeePassword}}</td>
                          <td>{{x.EmployeePhoneNumber}}</td>
                          <td>{{x.EmployeeAddress}}</td>
                          <td> <button class="btn-submit-mini" @click="editEmployeeView(x.EmployeeID)"><i class="fas fa-edit"></i></button>  <button class="btn-err" @click="removeEmployee(x.EmployeeID)"><i class="fas fa-trash-alt"></i></button></td>

                      </tr>
                    </table>
                </fieldset>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import SubHeaderControl from "@/components/SubHeaderControl.vue";
import Employees from "@/api_calls/Employees.js";
export default {
    name:"AddPurchase",
    components:{
        SubHeaderControl
    },
    data(){
   return {
       editName:'',
       editPass:'',
       editPhone:'',
       editAddress:'',
       editVisible:false,
       "items":[],
       links:
               [
                    {
                    id:1,
                    address:"employees",
                    displayText:"viewEmployees"
                   },{    
                       id:0,
                       address:"addEmployees",
                       displayText:"Add Employees"
                   }
                 
               ]
   }
    },
    methods:{
    editEmployeeView(id){
        this.editVisible = true;
        this.employeeEditable = this.items.filter(item=>{return item.EmployeeID ==  id});
        this.editName = this.employeeEditable[0].EmployeeName;
        this.editPhone = this.employeeEditable[0].EmployeePhoneNumber;
        this.editAddress = this.employeeEditable[0].EmployeeAddress;


    }, removeEmployee(id){
        this.$confirm("Are you sure? Deleting an employee can not be Undone!").then(
()=>{
      Employees.removeEmployee(id).then(res=>{
        this.$alert("Emloyee Removed Successfully",'SUCCESS','success');
       
        this.items = this.items.filter(item=>{return item.EmployeeID != id});
         console.log(res);
        }).catch(err=>{
            this.$alert(err.response.data.message,'ERROR','error');
            })}
        )
  
    }, updateEmployee(){
        const data = {
    "EmployeeName":this.editName,
    "EmployeePhoneNumber":this.editPhone,
    "EmployeeAddress":this.editAddress,
    "EmployeeId":this.employeeEditable[0].EmployeeID
}
       Employees.updateEmployee(data).then(res=>{
           this.closeUpdate(false);
           this.$alert("Employee updated","SUCCESS",'success');
           this.getEmployees();

           console.log(res["data"])}).catch(err=>{
            this.closeUpdate(false);
            this.$alert(err.response.data.message,"ERROR",'error');
       }) 
    }, closeUpdate(state){
            this.editVisible = state;
        },
        getEmployees(){
            Employees.getEmployees().then(item=>{
                this.items = item["data"];
                
                
            });
        }
        },
        created(){
          this.getEmployees();
        }
}
</script>
<style>
    .router-view-container{
    padding:20px;
    background: #eee;
    width:100%;
    height:auto;
}
.router-view-nav a{
color:black;
text-decoration:none;
font-size:20px;
}
.router-view-nav{
    /* display: grid;
    place-items:center; */
}
.router-view-nav li{
    list-style: none;
    display: inline;
    background: rgb(11, 170, 96);
    color:white;
    padding:15px;
    text-align:center;
    border-radius:5px;
}
.add-purchase{
    margin-top:18px;
}
.add-purchase h3{
margin-left: 15px;
}
.txt-input{
    padding:15px;
    width:350px;
    border:none;
    display: block;
    margin:10px;
    cursor: pointer;
    border-bottom:2px solid rgb(11, 170, 96);
    background:white;
}
.btn-submit{
    margin:10px;
    width:120px;
    padding:15px;
    border:none;
    border-radius:15px;
    cursor:pointer;
    color:white;
    background: rgb(11, 170, 96);
    font-size:20px;
}
.form-contain{
    display: grid;
    place-items:center;
}
.view-items th{
padding:15px;
}
.view-items td{
    padding:15px;
}
.view-items-header{
    background: rgb(11, 170, 96);
    color:white;
}
.view-items-container{
display: grid;
place-items: center;
}
.error{
    background:red;
}
.btn-del{
    width:30px;
    height:30px;
    font-weight:bolder;
    color:white;
    border:none;
    background:red;
    cursor:pointer;
    border-radius: 50%;

}
</style>