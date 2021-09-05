<template >
    <div class="router-view-container">
        <SubHeaderControl :links="links"/>
               <div class="router-view">
            <div class="add-purchase">
         <fieldset class="form-contain">
                <legend>
                    <h3>
                        Add Expenses
                    </h3>
                </legend>
                <form action="" @submit.prevent="addLoadingExpense">

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
                    <input v-model="LoadingDate" type="date" class="txt-input" required/>
              
                    <label for="Cost" >
                    <h3>
                    Cost
                    </h3>
                    </label>
                    <input v-model="Cost" type="number" class="txt-input" placeholder="cost" requried/>
              
                    <button type="submit"  class="btn-submit">Add</button>
                </form>
         
           
            </fieldset>
            <fieldset class='view-items-container'>
                <legend>
                    <h3>
                        Search Expenses
                    </h3>
                </legend>
                <table>
                    <tr>
                        <td>
                            <h2>
                                      From 
                            </h2>
                          
                        </td>
                        <td>
                            <h2>
                                     To 
                            </h2>
                        
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input @change="filter"  v-model="dateFilterLower" type="date" class="txt-input">
                        </td>
                         <td>
                            <input   @change="filter" v-model="dateFilterUpper" type="date" class="txt-input">
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
                            <th @click="sortCost" style="cursor:pointer;">
                                Cost
                            </th>
                            <th>
                                REFNO
                            </th>
                            <th>
                                X
                            </th> 
                          
                        </tr>
                      <tr  :name="x.LoadID" v-bind:key="index" v-for="(x,index) in displayedItems">  
                          <td>{{x.Date}}</td>
                          <td>{{x.Cost}}</td>
                          <td>{{x.REFNO}}</td>
                          <td> <button class="btn-submit-mini error" @click="removeLoadingExpense($event)"><i class="fas fa-trash-alt"></i></button></td>
                   
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
name:"AddLoadingExpense",
components:{
    SubHeaderControl
} ,
data(){
    return{   
        clicked:true,
        items:[],
        tempItems:[],
        LoadingDate:'',
        Cost:'',
        REFNO:'',
        page:1,
        pages:[],
        perPage:5,
        dateFilterLower:'',
        dateFilterUpper:'',

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


},
filter(){
//one variable
if(this.dateFilterLower != ""){
    this.items= this.tempItems.filter(item=>{
        return item.Date == this.dateFilterLower;
    });
}
//two variable
if(this.dateFilterLower != "" && this.dateFilterUpper != ""){
    this.items =  this.tempItems.filter(item=>{
        const d1 =  new Date(this.dateFilterUpper);
        const d2 =  new Date(item.Date);
        const d3 =  new Date(this.dateFilterLower);
        return d3 < d2  && d2 < d1;
    })
}

},
getLoadingExpense(){
    Expenses.getLoadingExpense().then(res=>{
       console.log(res);
       this.items = res["data"];
       this.tempItems =  res["data"];
    })
},
addLoadingExpense(){
    const data = {
         "Date":this.LoadingDate,
         "Cost":this.Cost,
         "REFNO":this.REFNO
    };
    Expenses.addLoadingExpense(data).then(res=>{
     this.items.push(data);   
     console.los(res);
    }).catch(err=>{
        console.log(err.response);
        alert(err.response.data.message)});

},
removeLoadingExpense(e){
    const id= e.target.parentNode.parentNode.getAttribute("name");
    this.$confirm("Are you sure? Removing an Expese can not be undone!!").then(()=>{
          Expenses.removeLoadingExpense(id).then(res=>{
        this.$alert("Expense Removed!!","SUCCESS","success");
        this.items=this.items.filter(item=>{return item.LoadID != id});
        console.log(res);
    }).catch(err=>{
        this.$alert(err.response.data.message,"ERROR","error")
});
    })
  
}
},watch:{
    items(){
        this.setPages();
    }
},computed:{
    displayedItems(){
        return this.paginate(this.items);
    }
},
created(){
this.getLoadingExpense();
}
}
</script>
<style >

</style>