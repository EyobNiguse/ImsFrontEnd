<template >
  <div class="router-view-container">
    <SubHeaderControl :links="links" />
    <div class="router-view">
      <!-- edit expense pop up -->
      <vue-window-modal
        :active="editVisible"
        title="Update Expense Details"
        v-on:clickClose="editVisibleUpdate(false)"
        style="width:auto;height:auto;"
      >
        <form @submit.prevent="updateOtherExpense">
          <table class="view-items">
            <tr class="view-items-header">
              <th>Date</th>
              <th>Cost</th>
            </tr>
            <tr>
              <td>
                <input type="date" v-model="editDate" />
              </td>
              <td>
                <input type="number" min="0" v-model="editCost" placeholder="Cost" />
              </td>
            </tr>
            <tr>
              <td>
                <button class="btn-submit" type="submit">Confirm</button>
              </td>
            </tr>
          </table>
        </form>
      </vue-window-modal>
      <!-- / edit expense pop up -->
      <div class="add-purchase">
        <fieldset class="form-contain">
          <legend>
            <h3>Add Other Expense</h3>
          </legend>
          <form @submit.prevent="addOtherExpense">
            <label for="expenseType">
              <h3>Expense Type</h3>
            </label>
            <select v-model="OEID" class="txt-input">
              <option :key="x.OEID" v-for="x in OETypes" :value="x.OEID">{{x.OEType}}</option>
            </select>

            <label for="Date">
              <h3>date</h3>
            </label>
            <input
              v-model="OEdate"
              type="date"
              class="txt-input"
              placeholder="Description"
              required
            />

            <label for="cost">Cost</label>
            <input v-model="Cost" type="number" class="txt-input" placeholder="Cost" requried />
            <button type="submit" class="btn-submit">Add</button>
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
                <select  @change="filter" v-model="typeFilter" >
              <option :key="x.OEID" v-for="x in OETypes" :value="x.OEID">{{x.OEType}}</option>
            </select>
              </td>
            </tr>
          </table>
        </fieldset>
        <fieldset class="view-items-container">
          <legend>
            <h3>Other Expenses</h3>
          </legend>
          <table class="view-items">
            <tr class="view-items-header">
              <th>Expense type</th>
              <th>Date</th>
              <th @click="sortCost">Cost</th>
              <th>X</th>
            </tr>
            <tr :name="x.OExpencesID" :key="index" v-for="(x,index) in items">
              <td>{{x.OtherExpencesTypes[0].OEType}}</td>
              <td>{{x.Date}}</td>
              <td>{{x.Cost}}</td>
              <td>
                <button @click="updateExpenseView(x.OExpencesID)" class="btn-submit-mini">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-err" @click="removeOtherExpense($event)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
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
  name: "removeOtherExpense",
  components: {
    SubHeaderControl
  },
  data() {
    return {
      items: [],
      tempItems:[],
      page:1,
      pages:[],
      perPage:5,
      clicked:true,
      dateFilterLower:'',
      dateFilterUpper:'',
      typeFilter:'',
      OETypes: [],
      editVisible: false,
      editCost: "",
      editDate: "",
      editableOEID: "",

      OEType: "",
      OEID: "",
      Cost: "",
      OEdate: "",
      OEDescription: "",
      links: [
        {
          id: 0,
          address: "expenses",
          displayText: "Loading"
        },
        {
          id: 2,
          address: "salaryExpense",
          displayText: "Salary"
        },
        {
          id: 3,
          address: "masatefiyaExpense",
          displayText: "Masatefiya"
        },
        {
          id: 4,
          address: "otherExpenseType",
          displayText: "Type"
        },
        {
          id: 5,
          address: "otherExpense",
          displayText: "Other"
        }
      ]
    };
  },
  methods: {
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
    getOtherExpense() {
      Expenses.getOtherExpense()
        .then(res => {
          this.items = res["data"];
          this.tempItems = res["data"];
        })
        .catch(err => alert(err));
    },
    addOtherExpense() {
      const data = {
        OEID: this.OEID,
        Date: this.OEdate,
        Cost: this.Cost
      };
      console.log(data);
      Expenses.addOtherExpense(data)
        .then(res => {
       this.getOtherExpense();
       this.$alert("Expense Added!!","SUCCESS","success");
      console.los(res);
        })
        .catch(err => {
       this.$alert(err.response.data.message,"ERROR","error");
        });
    },
    removeOtherExpense(e) {
      this.$confirm("Are you sure? Deleting Expense can not be undone").then(()=>{
         const id = e.target.parentNode.parentNode.getAttribute("name");
      Expenses.removeOtherExpense(id)
        .then(res => {
          this.items = this.items.filter(item => {
            return item.OExpencesID != id;
          });
          this.$alert("Expense removed!!","SUCCESS","success")
          console.log(res);
        })
        .catch(err => {
          this.$alert(err.response.data.message,"ERROR","error");
          });
      })
     
    },
    getOtherTypes() {
      Expenses.getOtherExpenseType().then(res => {
        this.OETypes = res["data"];
      });
    },
    updateExpenseView(id) {
      this.editVisible = true;
      this.editableOEID = id;
      const dt = this.items.filter(item => {
        return item.OEID == id;
      })[0];
      this.editDate = dt.Date;
      this.editCost = dt.Cost;
    },
    editVisibleUpdate(state) {
      this.editVisible = state;
    },
    updateOtherExpense() {
      const data = {
        Date: this.editDate,
        Cost: this.editCost,
        OExpencesID: this.editableOEID
      };
      Expenses.updateOtherExpense(data)
        .then(res => {
          console.log(res["data"]);
          this.editDate = "";
          this.editCost = "";
          this.editableOEID = "";
          this.getOtherExpense();
          this.editVisible = false;
          this.$alert("Expense Updated!!","SUCCESS","success");
        })
        .catch(err => {
          this.editVisible = false;

          this.$alert(err.response.data.message,"ERROR","error");


        });
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
  created() {
    this.getOtherExpense();
    this.getOtherTypes();
  }
};
</script>
<style >
</style>