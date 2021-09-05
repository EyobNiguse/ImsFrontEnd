<template >
    <div class="router-view-container">
        <SubHeaderControl :links="links"/>
        <!-- update crud pop up  -->
        <vue-window-modal :active="editVisible" title="Update Expense" v-on:clickClose="updateVisible(false)" style="width:auto;height:auto;">
<form @submit.prevent="updateSalary">
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
<input type="date"  v-model="editDate">
        </td>
        <td>
<input type="number" v-model="editCost" min="0" placeholder="Cost">
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
        <!-- /update crud pop  up -->
               <div class="router-view">
            <div class="add-purchase">
         <fieldset class="form-contain">
                <legend>
                    <h3>
                        Add Salary Expense
                    </h3>
                </legend>
                <form action="" @submit.prevent="addSalaryExpense">

       <label for="expenseType">
                    <h3>
                 Employee  
                    </h3>
                    </label>
                  
                    <select v-model="employeeID" class="txt-input">
                      
                        <option  :key="x.EmployeeID" v-for="x in EmployeeList" :value="x.EmployeeID">{{x.EmployeeName}}</option>
                    </select>
               
              <label for="Date">
                    <h3>
                     Date
                    </h3>
                    </label>
                    <input v-model="employeeDate" type="date" class="txt-input" required/>
              
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
                Filter By Name:
                 <select  @change="filter" v-model="employeeFilter" class="txt-input">
                      <option value=""> -- select Employee -- </option>
                        <option  :key="x.EmployeeID" v-for="x in EmployeeList" :value="x.EmployeeID">{{x.EmployeeName}}</option>
                    </select>
                
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
                                Employee Name
                            </th>
                            <th>
                                Change
                            </th> 
                          
                        </tr>
                      <tr  :name="x.SalaryID" v-bind:key="index" v-for="(x,index) in displayedItems">  
                          <td>{{x.Date}}</td>
                          <td>{{x.Cost}}</td>
                          <td>{{getEmployeeName(x.EmployeeID)}}</td>
                          <td>  <button  @click="updateExpenseView(x.SalaryID,x.EmployeeID)" class="btn-submit-mini">  <i class="fas fa-edit"></i></button> <button class="btn-err" @click="removeSalaryExpense($event)"><i class="fas fa-trash-alt"></i></button></td>
                   
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
import Employees from "@/api_calls/Employees.js";
export default {
name:"AddLoadingExpense",
components:{
    SubHeaderControl
} ,
data(){
    return{   
        items:[],
        tempItems:[],
        page:1,
        pages:[],
        perPage:5,
        employeeFilter:'',
        clicked:true,
        editableExpense:'',
        editDate:'',
        editCost:'',
        editVisible:false,
        employeeDate:'',
        editableEmployee:'',
        Cost:'',
        employeeID:'',
        EmployeeList:[],
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
    filter(){
        if(this.employeeFilter !=""){
            this.items = this.tempItems.filter(item=>{
            return item.EmployeeID == this.employeeFilter
        })
        }else{
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
getSalaryExpense(){
    Expenses.getSalaryExpense().then(res=>{
       this.items = res["data"];
       this.tempItems = res["data"];
    })
},
addSalaryExpense(){
    const data = {
     "Date":this.employeeDate,
    "Cost":this.Cost,
    "EmployeeID":this.employeeID
    };
    Expenses.addSalaryExpense(data).then(res=>{
     this.items.push(data);   
     this.$alert("Expense Added!!","SUCCESS","success");
     console.los(res);
    }).catch(err=>{
     this.$alert(err.response.data.message,"ERROR","error");
    });

},
removeSalaryExpense(e){
    this.$confirm("Are you sure?  removing a salary can not be Undone").then(()=>{
         const id= e.target.parentNode.parentNode.getAttribute("name");
    Expenses.removeSalaryExpense(id).then(res=>{
        this.items=this.items.filter(item=>{return item.SalaryID != id});
        this.$alert("Salary Removed!!","SUCCESS","success");
        
        console.log(res);
    }).catch(err=>{
        this.$alert(err.response.data.message,"ERROR","error");

    });
    })
   
},
getEmployees(){
Employees.getEmployees().then(res=>{this.EmployeeList = res["data"];}
).catch(err=>{
    alert(err.response.message);
})
}, 
getEmployeeName(id){
for(const x in this.EmployeeList){
    if(this.EmployeeList[x].EmployeeID == id){
        return this.EmployeeList[x].EmployeeName;
    }
}
},updateExpenseView(id,empID){
    this.editableExpense = id;
    this.editVisible = true;
    this.editableEmployee = empID;
    const dt = this.items.filter(item=>{return item.SalaryID == id})[0]
    this.editDate = dt.Date;
    this.editCost = dt.Cost;
},updateVisible(state){
    this.editVisible=state;
},updateSalary(){
    const data = {
        "Date":this.editDate,
        "Cost":this.editCost,
        "EmployeeID":this.editableEmployee,
        "SalaryID":this.editableExpense,
    }
    Expenses.updateSalary(data).then(res=>{
     
      console.log(res["data"])
      this.editDate = '';
      this.editCost='';
      this.editableEmployee = '';
      this.editableExpense = "";
      this.getSalaryExpense();
      this.editVisible = false;
      this.$alert("Salary Updated !!","SUCCESS","success")
}).catch(err=>{
    
    this.$alert(err.response.data.message,"ERROR","error");
        
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
this.getSalaryExpense();
this.getEmployees();
}
}
</script>
<style >

</style>