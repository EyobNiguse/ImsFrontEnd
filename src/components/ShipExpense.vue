<template >
    <div class="router-view-container">
        <SubHeaderControl :links="links"/>
        <!-- View Items pop up -->
        <vue-window-modal :active="listAll" title=" Shipped Items" v-on:clickClose="updateListAll(false)" style="width:auto;height:auto;"> 
                    <table class="view-items">
                    <tr class="view-items-header">
                        <th>
                            Item Type
                        </th>
                        <th>
                            IN
                        </th>
                        <th>
                            Change
                        </th>
                    </tr>
                    <tr  :key="x.WSID" v-for="x in itemsList">
                          <td>
                              {{getItemName(x.ItemID)}}
                        </td>  
                        <td>
                            {{x.INCount}}
                        </td>
                        <td>
                            <button @click="updateSinlgeItemView(x.WSID)" class="btn-submit-mini">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button @click="removeSingleItem(x.WSID)" class="btn-submit-mini err">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                    </table>
        </vue-window-modal>
        <!-- / view items pop up -->
        <!-- edit Single Ship pop up -->
        <vue-window-modal :active="singleEdit" title="update Transfer Item" v-on:clickClose="updateSingleEdit(false)" style="width:auto;height:auto;">
           <form @submit.prevent="updateShipmentItem">
               <label for="">IN</label>
               <input v-model="editIN"  type="number" class='txt-input'>
               <button   type="submit" class="btn-submit"> Update </button>
           </form>
        </vue-window-modal>
        <!-- /edit single ship pop up -->
        <!-- edit PersonalExpense Pop Up -->
    <vue-window-modal :active="editVisible" title="update Shipping Expense" v-on:clickClose="editVisibleUpdate(false)" style="width:auto;height:auto;">

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
        <select v-model="editDriver" id="">
                     <option value="">-- Select Driver--</option>
                     <option :value="x.DriverID"  :key="x.DriverID" v-for="x in drivers">{{x.DriverName}}</option>
                 </select>
                </td>
              
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
         <!-- <fieldset class="form-contain">
                <legend>
                    <h3>
                        Add Rent Expense
                    </h3>
                </legend>
                <form action="" @submit.prevent="addPersonalExpense">

       <label for="expenseType">
                    <h3>
                  Rent Type
                    </h3>
                    </label>
                    <select v-model="PEID" name="" id="" class="txt-input">
                        <option value="Warehouse">Warehouse</option>
                        <option value="Shop">Store</option>

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
         
           
            </fieldset> -->
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
                                Items
                            </th>
                            <th>
                                Change
                            </th> 
                          
                        </tr>
                      <tr  :name="x.TEID" v-bind:key="x.TEID" v-for="(x) in displayedItems">  
                        
                          <td>{{x.Date}}</td>
                          <td>{{x.Cost}}</td>
                          <td>
                              <button @click="viewItems(x.TEID)" class="btn-submit-mini">
                                  <i class="fas fa-eye">

                                  </i>
                              </button>
                          </td>
                          <td>   <button  @click="updateExpenseView(x.TEID)" class="btn-submit-mini"> <i class="fas fa-edit"></i> </button> <button class="btn-err" @click="removePersonalExpense(x.TEID)"><i class="fas fa-trash-alt"></i></button></td>
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
import Rent from "@/api_calls/Rent.js";
import Ship from "@/api_calls/Ship.js";
import Items from "@/api_calls/Items.js";
import Driver from "@/api_calls/Driver.js";
export default {
name:"RentExpense",
components:{
    SubHeaderControl
} ,
data(){
    return{ 
        singleEdit:false,
        editIN:'',
        drivers:[],
        editDriver:'',
        listAll:false, 
        editType:'', 
        itemsList:[],
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
            address:"shipExpense",
            displayText:"Expense"
        }
    ]
}},
methods:{
    removeSingleItem(id){
        this.listAll = false;
  this.$confirm("Are you sure? removeing an item can not be undone!!").then(()=>{
       const data = {
             "WSID":id
       }
      Ship.removeShipmentItem(data).then(res=>{

          this.$alert("Item Removed!!","SUCCESS","success");
          console.log(res);
      }).catch(err=>{
          this.$alert(err.response.data.message,"ERROR","error");
      })
  })
    },
    updateShipmentItem(){
        const data = {
    "newtransferdCount":this.editIN,
    "WSID":this.editItem
        }
        Ship.updateShipmentItem(data).then((res)=>{
                this.updateSingleEdit(false);
                this.$alert("Shipment Item Updated!!","SUCCESS","success");
                console.log(res);
        }).then(err=>{
            this.updateSingleEdit(false);
            this.$alert(err.response.data.message,"ERROR","error");
        })
    },
    updateSingleEdit(state){
        this.singleEdit =  state;
    },
    updateSinlgeItemView(id){
        this.listAll = false;
        this.singleEdit =   true;
     const data  = this.itemsList.filter(item=>{
         return item.WSID == id;
     })[0];
     console.log("check dat", data);
     this.editItem = id;
     this.editIN = data.INCount;
    },
    getDrivers(){
      Driver.getDrivers().then(item => {
      this.drivers = item["data"];
    });},
    getItems(){
        Items.getItems().then((res)=>{
            this.itemsAll = res["data"]; 
        })
    },
    updateListAll(state){
        this.listAll =  state;
    },
    viewItems(id){
        this.listAll = true;
        this.itemsList = this.items.filter(item=>{
            return item.TEID ==id;
        })[0]["Warehouse-Store"];
        console.log("check here 1", this.itemsList);
        
    },
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
  this.items =  this.tempItems.sort((a,b)=>(a.Payment > b.Payment) ? 1 : -1);  

  }else{
  this.items = this.tempItems.sort((a,b)=>(a.Payment < b.Payment) ? 1 : -1);    
 
  }
this.clicked = !this.clicked;
 
  console.log(this.clicked);


},
 
addPersonalExpense(){
    const data = {
    "RentType":this.PEID,
    "Date":this.billDate,
    "payment":this.Cost
    };
    Rent.addRentExpense(data).then(res=>{
      this.getAllExpenseList();  
        this.$alert(res.data.message,"SUCCESS","success");

    }).catch(err=>{
        this.$alert(err.response.data.message,"ERROR","error");
        });

},
removePersonalExpense(id){
 this.$confirm("Are you sure? removing expense can not be undone!!").then(()=>{
     const data = {
    "TEID": id
}
Ship.removeShipment(data).then(res=>{
        this.items = this.items.filter(item=>{return item.TEID != id});
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
    Ship.getAllShipment().then(res=>{
        this.items =  res["data"];
        console.log("expense Listed",this.items);
        this.tempItems = res["data"];
    })
}, getExpenseName(id){
    for(const x in this.items){
        if(this.items[x].PExpencesID == id){
            return this.items[x].PersonalExpencesTypes[0].PEType;
        }
    }
},
getItemName(id){
    for(const x in this.itemsAll){
        if(this.itemsAll[x].ItemID ==id){
            return this.itemsAll[x].ItemType;
        }
    }
},
updateExpenseView(id){
    console.log("check here", id);
    this.editVisible=true;
    this.editableBill = id;
    const dt = this.items.filter(item=>{return item.TEID == id})[0];
    this.editDate = dt.Date;
    this.editCost = dt.Cost;

},updateBillExpense(){
    const data = {
    "TEID":this.editableBill,
    "Date":this.editDate,
    "Cost":this.editCost,
    "DriverID":this.editDriver

    }
    Ship.updateShipment(data).then(res=>{
        console.log(res["data"])
        this.getAllExpenseList();
        this.editDate = "";
        this.editCost = "";
        this.editVisible = false;
        this.$alert(res.data.message,"SUCCESS","success");
    }).catch(err=>{
        this.editVisible = false;
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
    this.getDrivers();
    this.getItems();
    this.getAllExpenseTypeList();
    this.getAllExpenseList();
}
}
</script>
<style >

</style>