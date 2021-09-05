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
          <legend>
            <h3>
              Search Expense
            </h3>
          </legend>
          <table>
            <tr>
              <td>From</td>
              <td>To</td>
              <td>Type</td>
              <td>
                <button @click="clearForm" class="btn-submit-mini">
                  X
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <input  @change="filter" type="date" v-model="dateFilterLower">
              </td>
              <td> 
                <input   @change="filter" type="date" v-model="dateFilterUpper">
              </td>
              <td>
               <select v-model="typeFilter" name="" id="" >
                        <option   :key="x.PEID" :value="x.PEID" v-for="x in personalExpenseTypes">{{x.PEType}}</option>
                    </select>
              </td>
            </tr>
          </table>
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
                      <tr  :name="x.PExpencesID" v-bind:key="x.PExpencesID" v-for="(x) in displayedItems">  
                          <td>
                              {{getExpenseName(x.PExpencesID)}}
                          </td>
                          <td>{{x.Date}}</td>
                          <td>{{x.Cost}}</td>
            
                          <td>   <button  @click="updateExpenseView(x.PExpencesID)" class="btn-submit-mini"> <i class="fas fa-edit"></i> </button> <button class="btn-err" @click="removePersonalExpense(x.PExpencesID)"><i class="fas fa-trash-alt"></i></button></td>
                   
                      </tr>
                    </table>
                                        <span>
                <span class='prev'>
                    <button  v-if="page != 1" @click="page--"  class='btn-submit'>
                            Previous
                    </button>
                    </span>
                    <span class='number'>
                        <button  class='btn-submit-page'  :key='pageNumber' v-for="pageNumber in pages.slice(page-1, page+5)" @click="page = pageNumber">{{pageNumber}}</button>
                    </span>
                    <span class='next'>
                        <button @click="page++" v-if="page < pages.length"  class='btn-submit'>
                            Next
                        </button>
                    </span>
                    
            </span>
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
        tempItems:[],
        page:1,
        pages:[],
        perPage:5,
        clicked:true,
        dateFilterLower:'',
        dateFilterUpper:'',
        typeFilter:'',
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
        clearForm(){
      this.dateFilterLower = "";
      this.dateFilterUpper = "";
      this.typeFilter = "";
      this.filter(); 
    },
    filter(){
      //one variable
      if(this.dateFilterLower != ""){
        this.items = this.tempItems.filter(item=>{
          return item.Date == this.dateFilterLower;
        })
      }
      if(this.typeFilter != ""){
        this.items = this.tempItems.filter(item=>{
          return item.OEID == this.typeFilter;
        })
      }
      //two variable
      if(this.dateFilterLower !="" && this.dateFilterUpper !=""){
        this.items =  this.tempItems.filter(item=>{
        const d1 =  new Date(this.dateFilterUpper);
        const d2 =  new Date(item.Date);
        const d3 =  new Date(this.dateFilterLower);
        return d3 < d2  && d2 < d1;
    })
      } if(this.dateFilterLower == "" && this.dateFilterUpper == "" && this.typeFilter == ""){
        this.items = this.tempItems;
    }

    },
    setPages () {
      this.pages = [];
      let numberOfPages = Math.ceil(this.items.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate (pagedItems) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  pagedItems.slice(from, to);
    },
    sortCost(){
  if(this.clicked){
  this.items =  this.tempItems.sort((a,b)=>(a.Cost > b.Cost) ? 1 : -1);  

  }else{
  this.items = this.tempItems.sort((a,b)=>(a.Cost < b.Cost) ? 1 : -1);    
 
  }
this.clicked = !this.clicked;
 
  console.log(this.clicked);


},
 
addPersonalExpense(){
    const data = {
    "PEID":this.PEID,
    "Date":this.billDate,
    "Cost":this.Cost
    };
    PersonalExpense.addPersonalExpense(data).then(res=>{
      this.getAllExpenseList();  
        this.$alert(res.data.message,"SUCCESS","success");

    }).catch(err=>{
        this.$alert(err.response.data.message,"ERROR","error");
        });

},
removePersonalExpense(id){
 this.$confirm("Are you sure? removing expense can not be undone!!").then(()=>{
PersonalExpense.removePersonalExpense(id).then(res=>{
        this.PersonalExpenses = this.PersonalExpenses.filter(item=>{return item.PExpencesID != id});
        this.$alert(res.data.message,"SUCCESS","success");
    }).catch(err=>{
        this.$alert(err.response.data.message,"ERROR","error");
        });
 })
    
}, getAllExpenseTypeList(){
    PersonalExpense.getAllExpenseTypeList().then(res=>{
        this.personalExpenseTypes = res["data"];
    })
},
getAllExpenseList(){
    PersonalExpense.getAllExpenseList().then(res=>{
        this.items =  res["data"];
        this.tempItems = res["data"];
    })
}, getExpenseName(id){
    for(const x in this.items){
        if(this.items[x].PExpencesID == id){
            return this.items[x].PersonalExpencesTypes[0].PEType;
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
        this.editVisible = false;
        this.$alert(res.data.message,"SUCCESS","success");
    }).catch(err=>{
        this.$alert(err.response.data.message,"ERROR","error");
    })
},editVisibleUpdate(state){
    this.editVisible = state;
}
},watch:{
    items (){
        this.setPages();
    }
},computed:{
    displayedItems(){
        return this.paginate(this.items);
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