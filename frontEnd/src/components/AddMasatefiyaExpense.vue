<template >
    <div class="router-view-container">
        
        <SubHeaderControl :links="links"/>
        <!-- masatefiya edit pop up -->
        <vue-window-modal :active="editVisible" title="update Masatefiya Expense" v-on:clickClose="updateEditVisible(false)" style="width:auto;height:auto;">

<form @submit.prevent="updateExpense">
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
        <input type="date" v-model="editDate">
    </td>
    <td>
        <input type="text" v-model="editCost" placeholder="Cost">
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

        <!-- /masatefiya edit pop up -->
               <div class="router-view">
            <div class="add-purchase">
         <fieldset class="form-contain">
                <legend>
                    <h3>
                        Add Expenses
                    </h3>
                </legend>
                <form     @submit.prevent="addMasatefiyaExpense">

       <label for="expenseType">
                    <h3>
                      REFNO
                    </h3>
                    </label>
              <input v-model="REFNO"  type="number" class="txt-input" placeholder="REFERENCE NUMBER" required/>
              <label for="Date">
                    <h3>
                     Date
                    </h3>
                    </label>
                    <input v-model="masatefiyaDate" type="date" class="txt-input" required/>
              
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
                        Search  Expense
                    </h3>
                </legend>
                <table>
                    <tr>
                        <td>From</td>
                        <td>TO</td>
                        <td>REFNO</td>
                        <td>  
                            <button @click="clearForm"  class="btn-submit-mini">
                                x
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input  @change="filter"  v-model="dateFilterLower" type="date" >
                        </td>
                        <td>
                            <input  @change="filter" v-model="dateFilterUpper" type="date" >
                        </td>
                        <td>
                            <input  @input="filter"  v-model="refFilter"  type="number" class="txt-input" placeholder="REFNO">
                        </td>
                    </tr>
                </table>
            </fieldset>
            <fieldset class="view-items-container">
                    <legend> <h3> Expenses </h3></legend>
                    <table class="view-items">
                        <tr class="view-items-header">
                            <th>
                                Date
                            </th>
                            <th @click="sortCost" style="cursor:pointer">
                                Cost
                            </th>
                            <th>
                                REFNO
                            </th>
                            <th>
                             Change
                            </th> 
                          
                        </tr>
                      <tr  :name="x.MID" v-bind:key="index" v-for="(x,index) in displayedItems">  
                          <td>{{x.Date}}</td>
                          <td>{{x.Cost}}</td>
                          <td>{{x.REFNO}}</td>
                          <td> <button  @click="updateExpenseView(x.MID,x.REFNO)" class="btn-submit-mini"><i class="fas fa-edit"></i></button>  <button class="btn-err" @click="removeMasatefiyaExpense($event)"><i class="fas fa-trash-alt"></i></button></td>
                   
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
import Expenses from "@/api_calls/Expenses.js";
export default {
name:"addMasatefiyaExpense",
components:{
    SubHeaderControl
} ,
data(){
    return{  
        clicked:true, 
        items:[],
        tempItems:[],
        page:1,
        pages:[],
        perPage:5,
        dateFilterLower:'',
        dateFilterUpper:'',
        refFilter:'',
        editableExpense:'',
        editableRef:'',
        editVisible:false,
        editDate:'',
        editCost:'',
        masatefiyaDate:'',
        Cost:'',
        REFNO:'',
        links:[
        {
            id:0,
            address:"expenses",
            displayText:"Loading"
        },{
            id:2,
            address:"salaryExpense",
            displayText:"Salary"
        },{
            id:3,
            address:"masatefiyaExpense",
            displayText:"Masatefiya"
        },{
            id:4,
            address:"otherExpenseType",
            displayText:"Type"
        },{
                id:5,
                address:"otherExpense",
                displayText:"Other"
            }
    ]
}},
methods:{
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


}   ,
    clearForm(){
        this.dateFilterLower = "";
        this.dateFilterUpper ="";
        this.filter();
    },
filter(){
    // one Variable
    if(this.dateFilterLower != ""){
        this.items = this.tempItems.filter(item=>{
            return item.Date == this.dateFilterLower
        });
    }
    if(this.refFilter !=""){
        this.items = this.tempItems.filter(item=>{
            // console.log(item.REFNO.includes(this.refFilter) );
            return item.REFNO == this.refFilter;
        });
    }
    //two variable
    if(this.dateFilterLower !="" && this.dateFilterUpper !=""){
        this.items = this.tempItems.filter(item=>{
            const d1 =  new Date(this.dateFilterUpper);
            const d2 = new Date(item.Date);
            const d3 = new Date(this.dateFilterLower);
            return d3 < d2 && d2 < d1; 
        });
    }
    if(this.dateFilterLower == "" && this.dateFilterUpper == "" && this.refFilter == ""){
        this.items = this.tempItems;
    }
},
getMasatefiyaExpense(){
    Expenses.getMasatefiyaExpense().then(res=>{
       this.items = res["data"];
       this.tempItems = res["data"];
    })
},
addMasatefiyaExpense(){
    const data = {
         "Date":this.masatefiyaDate,
         "Cost":this.Cost,
         "REFNO":this.REFNO
    };
    Expenses.addMasatefiyaExpense(data).then(res=>{
     this.items.push(data);
     this.$alert("Expense Added!!","SUCCESS","success");
     console.log(res);
  
    }).catch(err=>{
        this.$alert(err.response.data.message,"ERROR","error");
        });

},
removeMasatefiyaExpense(e){
    this.$confirm("Are you sure? removing Expense can not be undone").then(()=>{
 const id= e.target.parentNode.parentNode.getAttribute("name");
    Expenses.removeMasatefiyaExpense(id).then(res=>{
        this.items=this.items.filter(item=>{return item.MID != id});
        this.$alert("Expense removed!!","SUCCESS","success");
        console.log(res);
    }).catch(err=>{
        this.$alert(err.response.data.message,"ERROR","error");
        console.log(err)});
    })
   
},
updateExpenseView(id,rfno){
 
this.editVisible  = true;
this.editableExpense = id;
this.editableRef = rfno;
const dt = this.items.filter(item=>{return item.MID == id})[0];
this.editDate = dt.Date;
this.editCost = dt.Cost;
},
updateEditVisible(state){
    this.editVisible = state;
},updateExpense(){
    const data = {
 "Date":this.editDate,
    "Cost":this.editCost,
    "REFNO":this.editableRef,
    "MID":this.editableExpense
    }
    Expenses.updateMasatefiyaExpense(data).then(res=>{
        console.log(res["data"])
        this.getMasatefiyaExpense();
        this.editVisible = false;
        this.$alert("Expense Updated!!","SUCCESS","success");
    }).catch(err=>{
        this.editVisible = false;
        this.$alert(err.response.data.messagem,"ERROR","error");
    })
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
this.getMasatefiyaExpense();
}
}
</script>
<style >

</style>