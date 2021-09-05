<template >
    <div class="router-view-container">
        <SubHeaderControl :links="links"/>
        <!-- edit PersonalExpense Pop Up -->
        <vue-window-modal :active="editVisible" title="update PersonalExpense Expense" v-on:clickClose="editVisibleUpdate(false)" style="width:auto;height:auto;">

    <form @submit.prevent="updateBillExpense">
        <table class="view-items">
            <tr class="view-items-header">
                <th>
                    Date
                </th>
                <th>
                    Cost
                </th>
            </tr>
            <tr>
                <td>
                    <input type="date" v-model="editDate" >
                </td>
                <td>
                    <input type="number" v-model="editCost" min="0" placeholder="Cost"  required/>

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
    
        <!-- /edit PersonalExpense pop up -->
               <div class="router-view">
            <div class="add-purchase">
         <fieldset class="form-contain">
                <legend>
                    <h3>
                        Add Personal Expense
                    </h3>
                </legend>
                <form action="" @submit.prevent="addPersonalExpense">

       <label for="expenseType">
                    <h3>
                  Personal Expense
                    </h3>
                    </label>
                    <select v-model="PEID" name="" id="" class="txt-input">
                        <option   :key="x.PEID" :value="x.PEID" v-for="x in personalExpenseTypes">{{x.PEType}}</option>
                    </select>
             
              <label for="Date">
                    <h3>
                     Date
                    </h3>
                    </label>
                    <input v-model="billDate" type="date" class="txt-input" required/>
              
                    <label for="Cost">
                    <h3>
                    Cost
                    </h3>
                    </label>
                    <input v-model="Cost" type="number" class="txt-input" placeholder="cost" requried/>
              
                    <button type="submit"  class="btn-submit">Add</button>
                </form>
         
           
            </fieldset>
            <fieldset class="view-items-container">
                    <legend> <h3> Expenses </h3></legend>
                    <table class="view-items">
                        <tr class="view-items-header">
                            <th>
                              Expense type
                            </th>
                            <th>
                                Date
                            </th>
                            <th>
                                Cost
                            </th>
                            <th>
                                Change
                            </th> 
                          
                        </tr>
                      <tr  :name="x.PExpencesID" v-bind:key="x.PExpencesID" v-for="(x) in PersonalExpenses">  
                          <td>
                              {{getExpenseName(x.PExpencesID)}}
                          </td>
                          <td>{{x.Date}}</td>
                          <td>{{x.Cost}}</td>
            
                          <td>   <button  @click="updateExpenseView(x.PExpencesID)" class="btn-submit-mini"> <i class="fas fa-edit"></i> </button> <button class="btn-err" @click="removePersonalExpense(x.PExpencesID)"><i class="fas fa-trash-alt"></i></button></td>
                   
                      </tr>
                    </table>
                </fieldset>
            </div>
         
        </div>
    </div>
</template>
<script>
import SubHeaderControl from "@/components/SubHeaderControl.vue";
import PersonalExpense from "@/api_calls/personalExpense.js";
export default {
name:"AddLoadingExpense",
components:{
    SubHeaderControl
} ,
data(){
    return{   
        PEID:'',
        editVisible:false,
        editableBill:'',
        editDate:'',
        editCost:'',
        items:[],
        billDate:'',
        personalExpenseTypes:[],
        PersonalExpenses:[],
       Cost:'',
        GRNNO:'',
        
        links:[
        {
            id:0,
            address:"personalexpense",
            displayText:"Expense"
        },{
            id:1,
            address:"personalexpenseType",
            displayText:"Types"
        }
    ]
}},
methods:{
 
addPersonalExpense(){
    const data = {
    "PEID":this.PEID,
    "Date":this.billDate,
    "Cost":this.Cost
    };
    PersonalExpense.addPersonalExpense(data).then(res=>{
      this.getAllExpenseList();  
     console.los(res);
    }).catch(err=>{
        console.log(err.response);
        alert(err.response.data.message)});

},
removePersonalExpense(id){
 
    PersonalExpense.removePersonalExpense(id).then(res=>{
        this.PersonalExpenses = this.PersonalExpenses.filter(item=>{return item.PExpencesID != id});
        console.log(res);
    }).catch(err=>console.log(err));
}, getAllExpenseTypeList(){
    PersonalExpense.getAllExpenseTypeList().then(res=>{
        this.personalExpenseTypes = res["data"];
    })
},
getAllExpenseList(){
    PersonalExpense.getAllExpenseList().then(res=>{
        this.PersonalExpenses =  res["data"];
    })
}, getExpenseName(id){
    for(const x in this.PersonalExpenses){
        if(this.PersonalExpenses[x].PExpencesID == id){
            return this.PersonalExpenses[x].PersonalExpencesTypes[0].PEType;
        }
    }
},
updateExpenseView(id){
    console.log("check here", id);
    this.editVisible=true;
    this.editableBill = id;
    const dt = this.PersonalExpenses.filter(item=>{return item.PExpencesID == id})[0];
    this.editDate = dt.Date;
    this.editCost = dt.Cost;

},updateBillExpense(){
    const data = {
        "Date":this.editDate,
    "Cost":this.editCost,
    "PExpencesID":this.editableBill
    }
    PersonalExpense.updateExpense(data).then(res=>{
        console.log(res["data"])
        this.getAllExpenseList();
        this.editDate = "";
        this.editCost = "";
        this.editVisible=false;
    }).catch(err=>{
        alert(err.response.data.message)
    })
},editVisibleUpdate(state){
    this.editVisible = state;
}
},
created(){
this.getAllExpenseTypeList();
this.getAllExpenseList();
}
}
</script>
<style >

</style>