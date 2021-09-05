<template >
    <div class="router-view-container">
        <SubHeaderControl :links="links"/>
         <div class="router-view">
            <div class="add-purchase">
         <fieldset class="form-contain">
                <legend>
                    <h3>
                        Add Customer
                    </h3>
                </legend>
               <form @submit.prevent="addCustomer">
                
               <input v-model="CustomerName" type="text" class="txt-input" placeholder="Customer Name" required/>
    
               <input v-model="CustomerAddress" type="text" class="txt-input" placeholder="Customer Address" required/>

               <input v-model="CustomerTinNumber"  type="text" class="txt-input" placeholder="Customer Tin Number" required/>  
  
                <input v-model="CustomerPhoneNumber" type="text" class="txt-input" placeholder="Customer Phone Number" required/>           
 
                <input v-model="BankName" type="text" class="txt-input" placeholder="Customer Bank Name" requried/>           
 
                <input v-model="BankAccount" type="text" class="txt-input" placeholder="Customer Bank Account Number" required>           

              <button type="submit" class="btn-submit">Add</button>
               </form>
           
            </fieldset>
            </div>
         
        </div>
    </div>
</template>
<script>
import SubHeaderControl from "@/components/SubHeaderControl.vue";
import Customer from "@/api_calls/Customer.js";
export default {
name:"addCustomer",
components:{
    SubHeaderControl
} ,
data(){
    return{    
    "CustomerName":"",
    "CustomerAddress":"",
    "CustomerTinNumber":"",
    "CustomerPhoneNumber":"",
    "BankAccount":"",
    "BankName":"",
        links:[
        {
            id:1,
            address:"Customer",
            displayText:"View Customer"
        },{
            id:0,
            address:"addCustomer",
            displayText:"Add Customer"
        }
    ]
}},methods:{
   
    addCustomer(){
         const data  = {
"CustomerName":this.CustomerName,
    "CustomerAddress":this.CustomerAddress,
    "CustomerTinNumber":this.CustomerTinNumber,
    "CustomerPhoneNumber":this.CustomerPhoneNumber,
    "BankAccount":this.BankAccount,
    "BankName":this.BankName,
    } 
  
    Customer.addCustomer(data).then(res=>{
        this.$alert("Customer Added","SUCCESS",'success');
        console.log(res)}).catch(err=>{
        this.$alert(err.response.data.message,"ERROR",'error');
            }
            );

    }

}
}
</script>
<style >

</style>