<template >
    <div class="router-view-container">
        <SubHeaderControl :links="links"/>
         <div class="router-view">
            <div class="add-purchase">
         <fieldset class="form-contain">
          
                <legend>
                    <h3>
                        Add Supplier
                    </h3>
                </legend>
                  <form @submit.prevent="addDriver">
                   <input v-model="DriverName" type="text" class="txt-input" placeholder="Deriver Name" required/>
    
               <input v-model="DriverPhone" type="text" class="txt-input" placeholder="Deriver Address" required/>
                
               <input v-model="DriverPlateNumber"  type="text" class="txt-input" placeholder="Deriver plate Number" required/>  
 
              <button class="btn-submit" type="submit">Add</button>
             </form>
            
            </fieldset>
            </div>
         
        </div>
    </div>
</template>
<script>
import SubHeaderControl from "@/components/SubHeaderControl.vue";
import Driver from "@/api_calls/Driver.js";
export default {
name:"AddDeriver",
components:{
    SubHeaderControl
} ,
data(){
    return{    
        DriverName:'',
        DriverPhone:'',
        DriverPlateNumber:'',
        links:[
            {
            id:1,
            address:"Driver",
            displayText:"Drivers"
        },
        {
            id:0,
            address:"addDriver",
            displayText:"Add Driver"
        }
    ]
}},
methods:{
    addDriver(){
        const data = {
     "DriverName":this.DriverName,
    "DriverPhoneNumber":this.DriverPhone,
    "DriverPlate":this.DriverPlateNumber
        }
      Driver.addDriver(data).then(res=>{
          this.$alert(res.data.message,"SUCCESS","success")
          console.log(res)}).catch(err=>{
              this.$alert(err.response.data.message,"ERROR","error")})  
    }
}

}
</script>
<style >

</style>