<template >
    <div class="router-view-container">
        <SubHeaderControl :links="links"/>  
        <div class="router-view">
            <div class="add-purchase">
         <fieldset class="form-contain">
 
                <legend>
                    <h3>
                        Add Employees
                    </h3>
                </legend>
                       <form @submit.prevent="addEmployee">

     <input v-model="employeeUserName" type="text" class="txt-input" placeholder="Employee UserName">
       
                <input v-model="employeeName" type="text" class="txt-input" placeholder="Employee Name">
            
                <input v-model="employeePassword" type="password" class="txt-input" placeholder="****">
              
                <input v-model="employeePhoneNumber" name="employePhone" type="text" class="txt-input" placeholder="employee Phone Number">
            
                <input v-model="employeeAddress" type="text" class="txt-input" placeholder="Employee Address">
              
              <button type="submit" class="btn-submit">Add</button>
             </form>
            </fieldset>
            </div>
         
        </div>
    </div>
</template>
<script>
import SubHeaderControl from "@/components/SubHeaderControl.vue";
import Employees from "@/api_calls/Employees.js";
export default {
    name:"AddEmployees",
    components:{
        SubHeaderControl
    },
    data(){
        return{
            employeeName:'',
            employeePhoneNumber:'',
            employeeAddress:'',
            employeeUserName:'',
            employeePassword:'',
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
    },methods:{
        addEmployee(){
             
            const data = {
    "EmployeeName": this.employeeName,
    "EmployeePassword": this.employeePassword,
    "EmployeePhoneNumber":this.employeePhoneNumber,
    "EmployeeAddress": this.employeeAddress,
    "EmployeeUserName": this.employeeUserName
            }
           console.log(data);
            Employees.addEmployee(data).then(res=>{
                this.$alert("Employee Added!!","SUCCESS",'success')
                console.log(res)}).catch(err=>{
                    this.$alert(err.response.data.message,'ERROR','error');
                    });
        }
    }
    
}
</script>
<style scoped>
    .form-contain{
        text-align:left;
        font-weight:bolder;
    }
</style>