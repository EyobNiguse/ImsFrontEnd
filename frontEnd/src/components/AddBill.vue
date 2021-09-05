<template >
    <div class="router-view-container">
        <SubHeaderControl :links="links"/>
        <!-- edit Bill Pop Up -->
        <vue-window-modal :active="editVisible" title="update Bill Expense" v-on:clickClose="editVisibleUpdate(false)" style="width:auto;height:auto;">

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
    
        <!-- /edit Bill pop up -->
               <div class="router-view">
            <div class="add-purchase">
         <fieldset class="form-contain">
                <legend>
                    <h3>
                        Add Bill Expense
                    </h3>
                </legend>
                <form action="" @submit.prevent="addBillExpense">

       <label for="expenseType">
                    <h3>
                    Bill Type
                    </h3>
                    </label>
                    <select v-model="BID" name="" id="" class="txt-input">
                        <option   :key="x.BID" :value="x.BID" v-for="x in billTypes">{{x.BILLType}}</option>
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
                        <option   :key="x.BID" :value="x.BID" v-for="x in billTypes">{{x.BILLType}}</option>
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
                              Bill Type
                            </th>
                            <th>    
                                Date
                            </th>
                            <th @click="sortCost" style="cursor:pointer;">
                                Cost
                            </th>
                            <th>
                                Change
                            </th> 
                          
                        </tr>
                      <tr  :name="x.BILLEXPENCEID" v-bind:key="x.BID" v-for="(x) in displayedItems">  
                          <td>
                              {{getBillName(x.BID)}}
                          </td>
                          <td>{{x.Date}}</td>
                          <td>{{x.Cost}}</td>
            
                          <td>   <button  @click="updateBillView(x.BILLEXPENCEID)" class="btn-submit-mini"> <i class="fas fa-edit"></i> </button> <button class="btn-err" @click="removeBillExpense($event)"><i class="fas fa-trash-alt"></i></button></td>
                   
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
import Bill from "@/api_calls/Bills.js";
export default {
name:"AddLoadingExpense",
components:{
    SubHeaderControl
} ,
data(){
    return{   
        BID:'',
        tempItems:[],
        page:1,
        pages:[],
        perPage:5,
        clicked:true,
        dateFilterLower:'',
        dateFilterUpper:'',
        typeFilter:'',
        editVisible:false,
        editableBill:'',
        editDate:'',
        editCost:'',
        items:[],
        billDate:'',    
        billTypes:[],
         
       Cost:'',
        GRNNO:'',
        
        links:[
        {
            id:0,
            address:"bill",
            displayText:"Bill"
        },{
            id:1,
            address:"billTypes",
            displayText:"Bill Types"
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
          return item.BID == this.typeFilter;
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
addBillExpense(){
    const data = {
    "BID":this.BID,
    "Date":this.billDate,
    "Cost":this.Cost
    };
    Bill.addBillExpense(data).then(res=>{
     this.items.push(data);
     this.$alert(res.data.message,"SUCCESS","success");   

    }).catch(err=>{
     
     this.$alert(err.response.data.message,"SUCCESS","success");   
     });

},
removeBillExpense(e){
  this.$confirm("Are you sure? Removing Expense can not be undone").then(()=>{
    const id= e.target.parentNode.parentNode.getAttribute("name");
    Bill.removeBillExpense(id).then(res=>{
        this.items = this.items.filter(item=>{return item.BILLEXPENCEID != id});
        this.$alert("Expense Removed","SUCCESS","success");
        console.log(res);
    }).catch(err=>{
        this.$alert(err.response.data.message,"ERROR","error");
        });
  })
 
}, getAllBillTypes(){
    Bill.getAllBillTypes().then(res=>{
        this.billTypes = res["data"];
    })
},
getAllExpenseList(){
    Bill.getAllExpenseList().then(res=>{
        this.items =  res["data"];
        this.tempItems = res["data"];
    })
}, getBillName(id){
    for(const x in this.billTypes){
        if(this.billTypes[x].BID == id){
            return this.billTypes[x].BILLType;
        }
    }
},
updateBillView(id){
    console.log("check here", id);
    this.editVisible=true;
    this.editableBill = id;
    const dt = this.items.filter(item=>{return item.BILLEXPENCEID == id})[0];
    
    this.editDate = dt.Date;
    this.editCost = dt.Cost;

},updateBillExpense(){
    const data = {
        "Date":this.editDate,
    "Cost":this.editCost,
    "BILLEXPENCEID":this.editableBill
    }
    Bill.updateBillExpense(data).then(res=>{
        console.log(res["data"])
        this.getAllExpenseList();
        this.editDate = "";
        this.editCost = "";
        this.editVisible=false;
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
this.getAllBillTypes();
this.getAllExpenseList();
}
}
</script>
<style >

</style>