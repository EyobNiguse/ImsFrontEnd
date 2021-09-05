<template>
  <div>
    <div class="router-view-container">
      <SubHeaderControl :links="links" />
      <!-- bank edit pop up -->
      <vue-window-modal :active="editBankVisible" title=" Update Bank Account" v-on:clickClose="editBankUpdate(false)" >
          <form @submit.prevent="updateBank">
            <table class="view-items">
                <tr class="view-items-header">
                    <th>
                        Bank Name
                    </th>
                    <th>
                        Bank Account
                    </th>
                </tr>
                <tr>
                    <td>
                        <input v-model="editName"  type="text" placeholder="Bank Name" required/>
                    </td>
                    <td>
                        <input v-model="editBank"  type="text" placeholder="Bank Number" required/>

                    </td>
                </tr>
                <tr>
                    <td>
                        <button class="btn-submit">
                            Confirm
                        </button>
                    </td>
                </tr>
            </table>
            </form>
      </vue-window-modal>
      <!-- /bank edit pop up -->
      <div class="router-view">
        <div class="add-purchase">
          <vue-window-modal
            :active="visibleAdd"
            title="Add Transaction"
            v-on:clickClose="visibleAddupdate(false)"
            style="width:auto;height:auto;"
          >
            <form @submit.prevent="addTransaction">
              <label for="date">
                <h3>Date</h3>
              </label>
              <input v-model="transactionDate" type="date" class="txt-input" required />
              <label for="TransactionType">
                <h3>Transaction Type</h3>
              </label>
              <select v-model="TransactionType" name="Transaction Type" class="txt-input">
                <option value="1">
                  <h3>Deposit</h3>
                </option>
                <option value="2">WithDraw</option>
              </select>
              <label for="amount">
                <h3>Amount</h3>
              </label>
              <input v-model="Amount" type="number" class="txt-input" placeholder="Amount" />
              <button class="btn-submit" type="submit">Add</button>
            </form>
          </vue-window-modal>
          <vue-window-modal
            :active="visibleFormCrud"
            title="Transaction Details"
            v-on:clickClose="visibleFormCrudUpdate(false)"
            style="width:auto;height:auto;"
          >
            <table class="view-items">
              <tr>
                <td>From</td>
                <td>To</td>
                <td>
                  <button @click="clearForm" class="btn-submit-mini">
                    x
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                <input   @change="filter"  v-model="dateFilterLower" type="date" >
                </td>
                <td>
                  <input  @change="filter"  v-model="dateFilterUpper"  type="date">
                </td>
              </tr>
              <tr class="view-items-header">
                <th>Date</th>
                <th>Deposit</th>
                <th>WithDraw</th>
                <th>Del</th>
              </tr>
              <tr :key="x.BTID" v-for="x in displayedDetails">
                <td>{{x.Date}}</td>

                <td>{{x.TransactionIN || "-"}}</td>

                <td>{{x.TransactionOUT || "-"}}</td>
                <td>
                  <button @click="removeTransaction(x.BTID)" class="btn-err">
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
          </vue-window-modal>
          <fieldset class="view-items-container">
            <legend>
              <h3>Personnal Accounts</h3>
            </legend>
            <table class="view-items">
              <tr class="view-items-header">
                <th>Name</th>
                <th>Bank Account</th>
                <th>Transaction</th>
                <th>
                    Change
                </th>
              </tr>
              <tr :name="x.PBID" v-bind:key="x.PBID" v-for="(x) in BankAccounts">
                <td>{{x.BankName}}</td>
                <td>{{x.AccountNumber}}</td>
                <td>
                  <button class="btn-submit-mini" @click="showDetail(x.PBID)">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <button class="btn-submit-mini" @click="addDetail(x.PBID)">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </td>
                <td>
                  <button class="btn-submit-mini" @click="updateBankView(x.PBID)">
                    <i class="far fa-edit"></i>
                  </button>
                  <button class="btn-submit-mini err" @click="removeBank(x.PBID)">
                    <i class="fa fa-window-close" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            </table>
          
          </fieldset>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SubHeaderControl from "@/components/SubHeaderControl.vue";
import BankAccounts from "@/api_calls/BankAccounts.js";
export default {
  name: "AddPurchase",
  components: {
    SubHeaderControl
  },
  data() {
    return {
      Amount: "",
      editBankVisible:false,
      editableBank:'',
      TransactionType: "",
      transactionDate: "",
      page:1,
      pages:[],
      perPage:2,
      clicked:true,
      dateFilterLower:'',
      dateFilterUpper:'',
      visibleAdd: false,
      visibleFormCrud: false,
      tempTransactionID: "",
      editName:'',
      editBank:'',
      BankAccounts: [],
      Transaction: [],
      items: [],
      bankDetails: [],
      tempBankDetails:[],
      links: [
        {
          id: 0,
          address: "banks",
          displayText: "My accounts"
        },
        {
          id: 1,
          address: "addBank",
          displayText: "Add Account"
        }
      ]
    };
  },
  methods: {
          clearForm(){
      this.dateFilterLower = "";
      this.dateFilterUpper = "";
    
      this.filter(); 
    },
    filter(){
      //one variable
      if(this.dateFilterLower != ""){
        console.log("her ewe are")
        this.bankDetails = this.tempBankDetails.filter(item=>{
          return item.Date == this.dateFilterLower;
        })
        console.log(this.bankDetails);
      }
      if(this.typeFilter != ""){
        this.bankDetails = this.tempBankDetails.filter(item=>{
          return item.OEID == this.typeFilter;
        })
      }
      //two variable
      if(this.dateFilterLower !="" && this.dateFilterUpper !=""){
        this.bankDetails =  this.tempBankDetails.filter(item=>{
        const d1 =  new Date(this.dateFilterUpper);
        const d2 =  new Date(item.Date);
        const d3 =  new Date(this.dateFilterLower);
        return d3 < d2  && d2 < d1;
    })
      } if(this.dateFilterLower == "" && this.dateFilterUpper == "" && this.typeFilter == ""){
        this.bankDetails= this.tempBankDetails;
    }

    },
    setPages () {
      this.pages = [];
      let numberOfPages = Math.ceil(this.bankDetails.length / this.perPage);
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
    visibleFormCrudUpdate(state) {
      this.visibleFormCrud = state;
    },
    showDetail(id) {
      const sb = this.BankAccounts.filter(item => item.PBID == id);
      this.bankDetails = sb[0].BankTransaction;
      this.tempBankDetails = sb[0].BankTransaction;
      this.visibleFormCrud = true;
    },
    getMyAccounts() {
      BankAccounts.getAllPersonnalAccounts().then(res => {
        this.BankAccounts = res["data"];
      });
    },
    visibleAddupdate(state) {
      this.visibleAdd = state;
    },
    addDetail(id) {
      this.tempTransactionID = id;
      this.visibleAdd = true;
    },
    addTransaction() {
      const data = {
        PBID: this.tempTransactionID,
        Amount: this.Amount,
        TransactionType: this.TransactionType,
        Date: this.transactionDate
      };
      BankAccounts.addTransaction(data)
        .then(res => {
          console.log(res);
          this.getMyAccounts();
            this.visibleAdd =false;
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    removeBank(id) {
      this.$confirm("Are you sure? removing an account can not be undone!!").then(()=>{
           BankAccounts.removeBankAccount(data)
        .then(res => {
          console.log(res);
          this.BankAccounts = this.BankAccounts.filter(bank => {
            return bank.PBID != id;
          });
          this.$alert("Account Removed!!","SUCCESS","success")
        })
        .catch(err => {
          this.$alert(err.response.data.message,"ERROR","error");
        });
      })
      const data = {
        PBID: id
      };
   
    },
    removeTransaction(id) {
      const data = {
        BTID: id
      };
      BankAccounts.removeTransaction(data)
        .then(res => {
          console.log(res);
          this.Transaction = this.Transaction.filter(item => {
            return item.BTID != id;
          });
          this.visibleFormCrud = false;
          this.getMyAccounts();
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },updateBankView(id){
        this.editBankVisible = true;
        this.editableBank  =id;
        const dt =  this.BankAccounts.filter(bnk=>{return bnk.PBID == id})[0];
        this.editName =  dt.BankName;
        this.editBank = dt.AccountNumber;
    },updateBank(){
        const data = {
    "PBID":this.editableBank,
    "AccountNumber":this.editBank,
    "BankName":this.editName
        }
        BankAccounts.updateBank(data).then(res=>{
            console.log(res["data"])
            this.getMyAccounts();
            this.editBankVisible = false;
            this.$alert("Bank Updated!!","SUCCESS","success");
            this.editName =  "";
            this.editBank = "";
            this.editableBank = "";
        }).catch(err=>{
            this.$alert(err.response.data.message,"ERROR","error");
        })
    },editBankUpdate(state){
        this.editBankVisible =  state;
    }
  },watch:{
    bankDetails (){
        this.setPages();
    }
},computed:{
    displayedDetails(){
      console.log("called");
        return this.paginate(this.bankDetails);
    }
},
  created() {
    this.getMyAccounts();
  }
};
</script>
<style>
@import "../assets/css/all.css";
.router-view-container {
  padding: 20px;
  background: #eee;
  width: 100%;
  height: auto;
}
.router-view-nav a {
  color: black;
  text-decoration: none;
  font-size: 20px;
}
.router-view-nav {
  /* display: grid;
    place-items:center; */
}
.router-view-nav li {
  list-style: none;
  display: inline;
  background: rgb(11, 170, 96);
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 5px;
}
.add-purchase {
  margin-top: 18px;
}
.add-purchase h3 {
  margin-left: 15px;
}
.txt-input {
  padding: 15px;
  width: 350px;
  border: none;
  display: block;
  margin: 10px;
  cursor: pointer;
  border-bottom: 2px solid rgb(11, 170, 96);
  background: white;
}
.btn-submit-mini {
  margin: 5px;
  width: 50px;
  height: 50px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background: rgb(11, 170, 96);
  font-size: 20px;
}
.btn-err {
  margin: 5px;
  width: 50px;
  height: 50px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background: rgb(255, 0, 0);
  font-size: 20px;
}
.form-contain {
  display: grid;
  place-items: center;
}
.view-items th {
  padding: 15px;
}
.view-items td {
  padding: 15px;
}
.view-items-header {
  background: rgb(11, 170, 96);
  color: white;
}
.view-items-container {
  display: grid;
  place-items: center;
}
.error {
  background: red;
}
.btn-del {
  width: 30px;
  height: 30px;
  font-weight: bolder;
  color: white;
  border: none;
  background: red;
  cursor: pointer;
  border-radius: 50%;
}
.err {
  background: red !important;
}
</style>