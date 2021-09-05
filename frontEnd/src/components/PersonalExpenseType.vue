<template >
  <div class="router-view-container">
    <SubHeaderControl :links="links" />
    <!-- edit Type pop up -->
    <vue-window-modal :active="editVisible" v-on:clickClose="editVisibleUpdate(false)" style="width:auto;height:auto;">
       <form @submit.prevent="updateType">
        <table class="view-items">
            <tr class="view-items-header">
                <th>
                    personalExpense Type
                </th>
                <th>
                    Description
                </th>
            </tr>
            <tr>
                <td>
                    <input  v-model="editType" type="text" placeholder="personalExpense Type">
                </td>
                <input type="text" v-model="editDescription" placeholder="personalExpense Description"> 
            </tr>
            <tr>
                <td>
                    <button class="btn-submit" type="submit">
                        confirm 
                    </button>
                </td>
            </tr>
        </table>
        </form>
    </vue-window-modal>
    <!-- /edit type pop up -->
    <div class="router-view">
      <div class="add-purchase">
        <fieldset class="form-contain">
          <legend>
            <h3>Add personalExpense Expense</h3>
          </legend>
          <form action @submit.prevent="addExpenseType">
            <label for="Date">
              <h3>Expense Type</h3>
            </label>
            <input v-model="expenseType" type="text" class="txt-input" required />

            <label for="Cost">
              <h3>Description</h3>
            </label>
            <input
              v-model="Description"
              type="text"
              class="txt-input"
              placeholder="Description"
              requried
            />

            <button type="submit" class="btn-submit">Add</button>
          </form>
        </fieldset>
        <fieldset class="view-items-container">
          <legend>
            <h3>Expense Types</h3>
          </legend>
          <table class="view-items">
            <tr class="view-items-header">
              <th>personalExpense Type</th>
              <th>Description</th>

              <th>change</th>
            </tr>
            <tr :name="x.PEID" v-bind:key="x.PEID" v-for="(x) in expenseTypes">
              <td>{{getExpenseName(x.PEID)}}</td>
              <td>{{x.PEDescription}}</td>

              <td>
                <button  @click="updateTypeView(x.PEID)" class="btn-submit-mini">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-err" @click="removeExpenseType(x.PEID)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </table>
        </fieldset>
      </div>
    </div>
  </div>
</template>
<script>
import SubHeaderControl from "@/components/SubHeaderControl.vue";
 
import personalExpense from "@/api_calls/personalExpense.js";
export default {
  name: "AddLoadingExpense",
  components: {
    SubHeaderControl
  },
  data() {
    return {
      Description: "",
      editVisible:false,
      editableType:'',
      editType:'',
      editDescription:'',
      PEID: "",
      items: [],
      billDate: "",
      expenseType: "",
      expenseTypes: [],
      billExpenses: [],
      Cost: "",
      GRNNO: "",

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
    };
  },
  methods: {
    addExpenseType() {
      const data = {
        PEType: this.expenseType,
        PEDescription: this.Description
      };
      personalExpense.addExpenseType(data)
        .then(res => {
          
          console.log(res["data"]);
          this.getAllExpenseTypes();
          this.$alert(res.data.message,"SUCCESS","success");
        })
        .catch(err => {
          this.$alert(err.response.data.message,"ERROR","error");
          console.log(err.response);
          });
    },
    removeExpenseType(id) {
      this.$confirm("Are you sure? removing Type can not be undone!").then(()=>{
           personalExpense.removeExpenseType(id)
        .then(res => {
          this.expenseTypes = this.expenseTypes.filter(item => {
            return item.PEID != id;
          });
          this.$alert(res.data.message,"SUCCESS","success");
          console.log(res);
        })
        .catch(err =>{
          this.$alert(err.response.data.message,"ERROR","error");
          });
      });
     
    },
    getAllExpenseTypes() {
      personalExpense.getAllExpenseTypeList().then(res => {
        this.expenseTypes = res["data"];
      });
    },
 
    getExpenseName(id) {
      for (const x in this.expenseTypes) {
        if (this.expenseTypes[x].PEID == id) {
          return this.expenseTypes[x].PEType;
        }
      }
    },
    updateTypeView(id){
        this.editVisible = true;
        this.editableType = id;
        const dt =  this.expenseTypes.filter(bill=>{return bill.PEID == id})[0];
     
        this.editType = dt.PEType;
        this.editDescription =dt.PEDescription;


    },updateType(){
        const data = {
               "PEType":this.editType,
    "PEDescription":this.editDescription,
    "PEID":this.editableType
        }
        personalExpense.updateExpensetype(data).then(res=>{
            console.log(res["data"])
            this.getAllExpenseTypes();
         this.editableType = "";
         this.editVisible = false;
         this.$alert(res.data.message,"SUCCESS","success");
         this.editType = "";
        this.editDescription = "";
            }).catch(err=>{
              this.$alert(err.response.data.message,"ERROR","error")
                })
    },editVisibleUpdate(state){
        this.editVisible=state;
    }
  },
  created() {
    this.getAllExpenseTypes();
     
  }
};
</script>
<style >
</style>