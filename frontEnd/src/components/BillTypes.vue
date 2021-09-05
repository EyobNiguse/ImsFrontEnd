<template >
  <div class="router-view-container">
    <SubHeaderControl :links="links" />
    <!-- edit Type pop up -->
    <vue-window-modal :active="editVisible" v-on:clickClose="editVisibleUpdate(false)" style="width:auto;height:auto;">
       <form @submit.prevent="updateType">
        <table class="view-items">
            <tr class="view-items-header">
                <th>
                    Bill Type
                </th>
                <th>
                    Description
                </th>
            </tr>
            <tr>
                <td>
                    <input  v-model="editType" type="text" placeholder="Bill Type">
                </td>
                <input type="text" v-model="editDescription" placeholder="Bill Description"> 
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
            <h3>Add Bill Expense</h3>
          </legend>
          <form action @submit.prevent="addBillType">
            <label for="Date">
              <h3>Bill Type</h3>
            </label>
            <input v-model="billType" type="text" class="txt-input" required />

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
            <h3>Expenses</h3>
          </legend>
          <table class="view-items">
            <tr class="view-items-header">
              <th>Bill Type</th>
              <th>Description</th>

              <th>change</th>
            </tr>
            <tr :name="x.BID" v-bind:key="x.BID" v-for="(x) in billTypes">
              <td>{{getBillName(x.BID)}}</td>
              <td>{{x.BillDescription}}</td>

              <td>
                <button  @click="updateTypeView(x.BID)" class="btn-submit-mini">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-err" @click="removeBillType(x.BID)">
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
import Bill from "@/api_calls/Bills.js";
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
      BID: "",
      items: [],
      billDate: "",
      billType: "",
      billTypes: [],
      billExpenses: [],
      Cost: "",
      GRNNO: "",

      links: [
        {
          id: 0,
          address: "bill",
          displayText: "Bill"
        },
        {
          id: 1,
          address: "billTypes",
          displayText: "Bill Types"
        }
      ]
    };
  },
  methods: {
    addBillType() {
      const data = {
        BILLType: this.billType,
        BILLDescription: this.Description
      };
      Bill.addBillType(data)
        .then(res => {
          this.billTypes.push(data);
          this.$alert(res.data.message,"SUCCESS","success");
          console.los(res);
        })
        .catch(err => {
          this.$alert(err.response.data.message,"ERROR","error");
        });
    },
    removeBillType(id) {
      this.$confirm("Are you sure? Removing type can not be undone!!").then(()=>{
            Bill.removeBillType(id)
        .then(res => {
          this.billTypes = this.billTypes.filter(item => {
            return item.BID != id;
          });
          this.$alert(res.data.message,"SUCCESS","success");
          this.getAllExpenseList();
          console.log(res);
        })
        .catch(err => {
          this.$alert(err.response.data.message,"ERROR","error");
          });
      })
    
    },
    getAllBillTypes() {
      Bill.getAllBillTypes().then(res => {
        this.billTypes = res["data"];
      });
    },
    getAllExpenseList() {
      Bill.getAllExpenseList().then(res => {
        this.billExpenses = res["data"];
      });
    },
    getBillName(id) {
      for (const x in this.billTypes) {
        if (this.billTypes[x].BID == id) {
          return this.billTypes[x].BILLType;
        }
      }
    },
    updateTypeView(id){
        this.editVisible = true;
        this.editableType = id;
        const dt =  this.billTypes.filter(bill=>{return bill.BID == id})[0];
     
        this.editType = dt.BILLType;
        this.editDescription =dt.BillDescription;


    },updateType(){
        const data = {
               "BILLType":this.editType,
    "BillDescription":this.editDescription,
    "BID":this.editableType
        }
        Bill.updateBillType(data).then(res=>{
            console.log(res["data"])
            this.getAllBillTypes();
         this.editableType = "";
         this.editVisible = false;
         this.$alert(res.data.message,"SUCCESS","success");
         this.editType = "";
        this.editDescription = "";
            }).catch(err=>{
             
             this.$alert(err.response.data.message,"ERROR","error");

                })
    },editVisibleUpdate(state){
        this.editVisible=state;
    }
  },
  created() {
    this.getAllBillTypes();
    this.getAllExpenseList();
  }
};
</script>
<style >
</style>