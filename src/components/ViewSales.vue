<template>
    <div>
            <div class="router-view-container">
                <SubHeaderControl :links="links"/>
                <!-- edit Item pop up -->
                <vue-window-modal :active="editVisibleItem" title="Update Item" v-on:clickClose="editVisibleItemUpdate(false)" style="width:auto;height:auto;">
                    <form @submit.prevent="updateSaleItem">
                    <table class="view-items">
                        <tr class="view-items-header">
                            <th>
                                PPP
                            </th>
                            <th>
                                Quantity
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <input    v-model="editPPP"  type="number" min="0"  placeholder="PPP">
                            </td>
                            <td>
                                <input  v-model="editQuantity" type="number" min="0" placeholder="Quantity">
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
                <!-- /edit item pop up -->
                <!-- edit Sales pop up-->
                <vue-window-modal :active="editVisible" title="Edit Sales" v-on:clickClose="editVisibleUpdate(false)" style="width:auto;height:auto;">
                 <form @submit.prevent="updateSale">
                    <table class="view-items">
                        <tr class="view-items-header">
                            <th>
                                Date
                            </th>
                            <th>
                                Customer
                            </th>
                            <th>
                                Driver
                            </th>
                        </tr>
                        <tr>

                            <td>
                  
                                <input v-model="editDate" type="date">
                            </td>
                            <td>
                   

                                <select  v-model="editCustomer"  >
                                    <option :value="x.CustomerID"  :key="x.CutomerID" v-for="x in CustomersList">
                                        {{x.CustomerName}}
                                    </option>
                                </select>
                            </td>
                            <td>
                                <select  v-model="editDriver"  >
                                    <option :key="x.DriverID" :value="x.DriverID" v-for="x in DriversList">{{x.DriverName}}</option>
                                </select>
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
                
                <!-- /edit sales pop up -->
                <!-- view list  -->
                <vue-window-modal :active="listVisible"  title="Items List" v-on:clickClose="listVisibleUpdate(false)" style="width:auto;height:auto;">
                            <table class="view-items">
                                <tr class="view-items-header">
                                    <th>
                                        REFNO
                                    </th>
                                    <th>
                                        Item ID
                                    </th>
                                    <th>
                                        PPP
                                    </th>
                                    <th>
                                        Quantity
                                    </th>
                                    <th>
                                        Total
                                    </th>
                                    <th>
                                        Change
                                    </th>
                                   
                                </tr>
                                <tr  :key="x.ItemID"  v-for="x in items">
                                    <td>
                                        {{x.REFNO}}
                                    </td>
                                    <td>
                                        {{x.ItemID}}
                                    </td>
                                    <td>
                                        {{x.PPP}}
                                    </td>
                                    <td>
                                        {{x.Quantity}}
                                    </td>
                                    <td>
                                        {{x.Total}}
                                    </td>
                                    <td>
                                        <button   @click="updateItemView(x.SalesId,x.REFNO)" class="btn-submit-mini">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button @click="removeItem(x.SalesId,x.REFNO)" class="btn-err">
                                            <i class="fas fa-trash-alt">

                                            </i>
                                        </button>
                                    </td>
                                    
                                </tr>
                            </table>
                </vue-window-modal>
                <!-- /view list -->
            <div class="router-view">
                <div class="add-purchase">
                  <fieldset class="form-contain">
                      <legend>
                          <h3>
                              Search Sales
                        </h3>
                    </legend>
                    <table>
                
                        <tr>
                            <td> 
                               <label  for="Customer"> <h3>Customer</h3></label>
                                <select @change="filter" v-model="customerFilter" name="Customer" id="" class="txt-input" required>
                                    
                                <option  :key="x.CustomerID" :value="x.CustomerID" v-for="x in CustomersList">{{ x.CutomerID }}{{ x.CustomerName}}</option>
                               </select></td>
                            <td>
                                <label for="purchaseType"> <h3>Purchase type</h3></label>
                                <select  @change="filter" v-model="transactionFilter" name="purchaseType" id="" class="txt-input">
                                    <option value="">--select Transaction--</option>
                                    <option value="1">cash</option>
                                    <option value="2">Credit</option>
                                </select>
                            </td>
                            <td>
                              <button class="btn-submit-mini" @click="clearForm">
                                X
                              </button>
                            </td>
                        </tr>
                        <tr>
                         <td>
                            <label for="purchaseDate"> <h3> From </h3></label>
                            <input  @change="filter" v-model="dateFilterLower" type="date" class="txt-input" name="purchaseDate" placeholder="GRN NO"  ></td>
                         <td>  <label for="purchaseDate"> <h3> To </h3></label>
                            <input   @change="filter"  v-model="dateFilterUpper" type="date" class="txt-input" name="deliveryDate"></td>
                        </tr>
                
                        <tr>

                        </tr>
                 
              
                    </table>
                     
                     
           
                  </fieldset>
                <fieldset class="view-items-container">
                    <legend> <h3> Items List </h3></legend>
                    <table class="view-items">
                        <tr class="view-items-header">
                            <th>
                             REFNO 
                            </th>
                            <th>
                              Sales Date
                            </th>
                            <th>
                              Type
                            </th>
                            <th>
                               Customer
                            </th>
                            <th>
                              Item Types 
                            </th>
                            <th>
                               Change
                            </th>
                            <th>
                              Print
                            </th>
                        </tr>
                     <tr  :key="x.REFNO" :name="x.REFNO" v-for="x in displayedItems" >
                        <td>{{x.REFNO}}</td>
                          <td>{{x.Date}}</td>
                          <td> {{x.TransactionID==1?'Cash':'Credit'}}</td>
                          <td>{{getCustomerName(x.CustomerID)}}</td>
                          <td> <button  @click="listView(x.REFNO)" class="btn-submit-mini"><i class="fas fa-eye"></i></button></td>
                          <td>   <button  @click="editView(x.REFNO)" class="btn-submit-mini">  <i class="fas fa-edit"></i> </button> <button class="btn-err" @click="removeSales(x.REFNO)"><i class="fas fa-trash-alt"></i></button></td>
                          <td>
                            <button @click="printView(x.REFNO)" class="btn-submit-mini">
                               <i class="fas fa-print"></i>
            
                            </button>
                          </td>
                     </tr>
                    </table>
                        <span >
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
    </div>
</template>
<script>
import SubHeaderControl from "@/components/SubHeaderControl.vue";
import Supplier from "@/api_calls/Supplier.js";
import Sales from "@/api_calls/Sales.js";
import Driver from "@/api_calls/Driver.js";
import Customer from "@/api_calls/Customer.js";
export default {
    name:"ViewSales",
    components:{
        SubHeaderControl
    },data(){
        return {
            pages:[],
            page:1,
            perPage:5,
            pageList:1,
            pagesList:[],
            editPPP:'',
            editID:'',
            editableSale:'',
            editQuantity:'',
            editVisibleItem:false,
            REFNO:'',
            editDate:'',
            dateFilterLower:'',
            dateFilterUpper:'',
            customerFilter:'',
            transactionFilter:'',
            editCustomer:'',
            editDriver:'',
            editVisible:false,
            DriversList:[],
            REFNNO:'',
            listVisible:false,
            items:[],
            tempItems:[],
            SuppliersList:[],
            CustomersList:[],
            CutomerID:'',
            links:[
                {
                    id:1,
                    address:"Sales",
                    displayText:"Sales"
                },
                {
                    id:0,
                    address:"addSales",
                    displayText:"Add Sales",

                }
            ]
        }
    },methods:{
      printView(id){
        this.itemsList = this.items.filter(item=>{
          return item.REFNO == id;
        });
      },
      clearForm(){
        this.customerFilter="";
        this.transactionFilter="";
        this.dateFilterLower="";
        this.dateFilterUpper="";
        this.filter();
      },
  filter() {
      const filterValues = [
        this.customerFilter,
        this.transactionFilter,
        this.dateFilterLower,
        this.dateFilterUpper,
       
      ];
      this.filterView = true;
 
      let supplier = false;
      let transaction = false;
      let purchaseLower = false;
      let purchaseUpper = false;
      let deliveredLower = false;
      let deliveredUpper = false;
      let notEmpty = [];
      
      // const isEmpty = false;
      // 0 supplier
      // 1 transaction
      // 2 purchase date lower
      // 3 purchase date upper
      // 4 delivered Lower
      // 5 delivered upper
      filterValues.forEach((item, index) => {
        if (item != "") {
          notEmpty.push({ item: item, index: index });
        }
      });
      for (let i = 0; i < notEmpty.length; i++) {
        switch (notEmpty[i].index) {
          case 0:
            supplier = true;
            console.log(0);
            break;
          case 1:
            transaction = true;
            console.log(1);
            break;
          case 2:
            purchaseLower = true;
            console.log(2);
            break;
          case 3:
            purchaseUpper = true;
            console.log(3);

            break;
          case 4:
            deliveredLower = true;
            console.log(4);

            break;
          case 5:
            deliveredUpper = true;
            console.log(5);
            break;
        }
      }
      // one variable
      if (supplier) {
        console.log("check this field",this.tempItems);
        this.items = this.tempItems.filter(item => {
        
          return item.CutomerID == this.customerFilter;
        });
        console.log("this after",this.items);
      }
      if (transaction) {
        this.items = this.tempItems.filter(item => {
          return item.TransactionID == this.transactionFilter;
        });
      }
      if (deliveredLower) {
        this.items = this.tempItems.filter(item => {
          return item.DeliverdDate == this.deliveredDateFilterLower;
        });
      }
      if (purchaseLower) {
        this.items = this.tempItems.filter(item => {
          return item.Date == this.dateFilterLower;
        });
      }
      // two variables
      if (purchaseLower && purchaseUpper) {
        this.items = this.tempItems.filter(item => {
          const d1 = new Date(this.dateFilterUpper);
          const d2 = new Date(item.Date);
          const d3 = new Date(this.dateFilterLower);
          console.log("just handle ", d3 < d2 < d1);
          return d3 < d2 && d2 < d1;
        });
      }
      if (deliveredLower && deliveredUpper) {
        this.items = this.tempItems.filter(item => {
          const d1 = new Date(this.deliveredDateFilterUpper);
          const d2 = new Date(item.DeliverdDate);
          const d3 = new Date(this.deliveredDateFilterLower);
          return d3 < d2 && d2 < d1;
        });
      }
      if (transaction && deliveredLower) {
        this.items = this.tempItems
          .filter(item => {
            return item.DeliverdDate == this.deliveredDateFilterLower;
          })
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          });
      }
      if (supplier && transaction) {
        this.items = this.tempItems
          .filter(item => {
            return item.CutomerID == this.customerFilter;
          })
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          });
      }
      if (supplier && purchaseLower) {
        this.items = this.tempItems
          .filter(item => {
            return item.CutomerID == this.customerFilter;
          })
          .filter(item => {
            return item.Date == this.dateFilterLower;
          });
      }
      if (supplier && deliveredLower) {
        this.items = this.tempItems
          .filter(item => {
            return item.DeliverdDate == this.deliveredDateFilterLower;
          })
          .filter(item => {
            return item.CutomerID == this.customerFilter;
          });
      }
      if (purchaseLower && deliveredLower) {
        this.items = this.tempItems
          .filter(item => {
            return item.Date == this.dateFilterLower;
          })
          .filter(item => {
            return item.DeliverdDate == this.deliveredDateFilterLower;
          });
      }
      // two is done

      // three Variable
      if (supplier && purchaseLower && purchaseUpper) {
        this.items = this.tempItems
          .filter(item => {
            return item.CutomerID == this.customerFilter;
          })
          .filter(item => {
            const d1 = new Date(this.dateFilterUpper);
            const d2 = new Date(item.Date);
            const d3 = new Date(this.dateFilterLower);
            return d3 < d2 && d2 < d1;
          });
      }
      if (supplier && transaction && purchaseLower) {
        this.items = this.tempItems
          .filter(item => {
            return item.CutomerID == this.customerFilter;
          })
          .filter(item => {
            return item.Date == this.dateFilterLower;
          })
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          });
      }
      if (supplier && deliveredLower && deliveredUpper) {
        this.items = this.tempItems
          .filter(item => {
            const d1 = new Date(this.deliveredDateFilterUpper);
            const d2 = new Date(item.DeliverdDate);
            const d3 = new Date(this.deliveredDateFilterLower);
            return d3 < d2 && d2 < d1;
          })
          .filter(item => {
            return item.CutomerID == this.customerFilter;
          });
      }
      if (supplier && deliveredLower && transaction) {
        this.items = this.tempItems
          .filter(item => {
            return item.DeliverdDate == this.deliveredDateFilterLower;
          })
          .filter(item => {
            return item.CutomerID == this.customerFilter;
          })
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          });
      }
      if (transaction && deliveredLower && deliveredUpper) {
        this.items = this.tempItems
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          })
          .filter(item => {
            const d1 = new Date(this.deliveredDateFilterUpper);
            const d2 = new Date(item.DeliverdDate);
            const d3 = new Date(this.deliveredDateFilterLower);
            return d3 < d2 && d2 < d1;
          });
      }
      if (transaction && purchaseLower && purchaseUpper) {
        this.items = this.tempItems
          .filter(item => {
            const d1 = new Date(this.dateFilterUpper);
            const d2 = new Date(item.Date);
            const d3 = new Date(this.dateFilterLower);
            return d3 < d2 && d2 < d1;
          })
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          });
      }
      if (purchaseLower && deliveredLower && deliveredUpper) {
        this.items = this.tempItems
          .filter(item => {
            return item.Date == this.dateFilterLower;
          })
          .filter(item => {
            const d1 = new Date(this.deliveredDateFilterUpper);
            const d2 = new Date(item.DeliverdDate);
            const d3 = new Date(this.deliveredDateFilterLower);
            return d3 < d2 && d2 < d1;
          });
      }
      //four variable
      if (supplier && transaction && purchaseLower && purchaseUpper) {
        this.items = this.tempItems
          .filter(item => {
            return item.CutomerID == this.customerFilter;
          })
          .filter(item => {
            const d1 = new Date(this.dateFilterLower);
            const d2 = new Date(this.dateFilterUpper);
            const d3 = new Date(item.Date);
            console.log("check handler", d1 < d3 && d3 < d2);
            return d1 < d3 && d3 < d2;
          })
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          });
      }
      if (supplier && deliveredLower && deliveredUpper && transaction) {
        this.items = this.tempItems
          .filter(item => {
            const d1 = new Date(this.deliveredDateFilterUpper);
            const d2 = new Date(item.DeliverdDate);
            const d3 = new Date(this.deliveredDateFilterLower);
            return d3 < d2 && d2 < d1;
          })
          .filter(item => {
            return item.CutomerID == this.customerFilter;
          })
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          });
      }
      if (supplier && transaction && deliveredLower && deliveredUpper) {
        this.items = this.tempItems
          .filter(item => {
            return item.CutomerID == this.customerFilter;
          })
          .filter(item => {
            const d1 = new Date(this.deliveredDateFilterLower);
            const d2 = new Date(this.deliveredDateFilterUpper);
            const d3 = new Date(item.deliveredDate);
            return d1 < d3 && d3 < d2;
          });
      }
      // six variable
      if (
        supplier &&
        transaction &&
        deliveredLower &&
        deliveredUpper &&
        purchaseLower &&
        purchaseUpper
      ) {
        this.items = this.tempItems
          .filter(item => {
            const d1 = new Date(this.deliveredDateFilterLower);
            const d2 = new Date(this.deliveredDateFilterUpper);
            const d3 = new Date(item.deliveredDate);
            return d1 < d3 && d3 < d2;
          })
          .filter(item => {
            const d1 = new Date(this.dateFilterLower);
            const d2 = new Date(this.dateFilterUpper);
            const d3 = new Date(item.Date);
            return d1 < d3 && d3 < d2;
          })
          .filter(item => {
            return item.CutomerID == this.customerFilter;
          })
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          });
      }
      if (!supplier && !transaction && !purchaseLower && !deliveredLower) {
        this.items = this.tempItems;
        this.filterView = false;
      }
    console.log("final Output", this.items);
      this.setPages();
    },
          setPages () {
      this.pages = [];
      let numberOfPages = Math.ceil(this.items.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    }
      ,
    paginate (pagedItems) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  pagedItems.slice(from, to);
    },
        getSuppliers(){
            Supplier.getSuppliers().then(res=>{
                this.SuppliersList =  res["data"]
            })
        },
        getSales(){
            Sales.getSales().then(res=>{
                this.items =  res["data"];
                this.tempItems =  res["data"];
                console.log(this.tempItems);
                
            })
        },
        getCustomerName(id){
            for(const x in this.CustomersList){
              if(this.CustomersList[x].CutomerID==id){
                  return this.CustomersList[x].CustomerName;
              }
            }
        },
        removeSales(id){
           this.$confirm("Are you sure You want to Delete you can not undo This Action","WARNING","error").then(res=>{
            console.log(res);
            Sales.removeSales(id).then(res=>{
                console.log(res);
                this.items = this.items.filter(item=>{return item.REFNO != id});
            }).catch(err=>{
                console.log(err);
            })
           })
           
        },
        listView(id){
            this.listVisible = true;
            this.viewREF  = id;
            this.items = this.items.filter(item=>{return item.REFNO == id})[0].Sales;
        }
        ,listVisibleUpdate(state){
            this.listVisible= state;
        },editView(id){
            this.editVisible = true;
            this.REFNO = id;
           
         const dt = this.items.filter(item=>{
             return item.REFNO == id;
         })[0]
       
         this.editDate  = dt.Date;
         this.editCustomer =  dt.CutomerID;
          
       
       }, getDrivers(){
               },
            getCustomers(){
                Customer.getCustomers().then(res=>{
                    this.CustomersList = res["data"];
                }).catch(err=>{
                  console.log(err)
                    // this.$alert(err.response.data.message);
                })
            },editVisibleUpdate(state){
                this.editVisible = state;
            }, updateSaleItem(){
                const data = {
                    "PPP":this.editPPP,
                    "Quantity":this.editQuantity,
                    "SalesID":this.editID,
                    "REFNO":this.editableSale
                }
            Sales.updateSaleItem(data).then(res=>{
                console.log(res["data"])
                this.editVisibleItem = false;
                this.$confirm("item Updated Successfully", "SUCCESS","success");
            }).catch(err=>{
                console.log(err);
                this.$alert("an error occured can't Update");
            })},updateItemView(id,ref){
                this.editableSale = ref;
                this.editID = id;
                this.editVisibleItem = true;
                this.listVisible = false;
            const dt = this.items.filter(item=>{return item.SalesId == id})[0]
            this.editPPP = dt.PPP;
            this.editQuantity  = dt.Quantity; 
            },editVisibleItemUpdate(state){
                this.editVisibleItem=state;
            },removeItem(id,ref){
                const data = {
                "SalesID":id,
                "REFNO":ref
                }
                this.listVisible=false;
                this.$confirm("Are you sure You want to Delete you can not undo This Action","WARNING","error").then(res=>{
             console.log(res);
             Sales.removeItem(data).then(res=>{
                    console.log(res["data"])
                    this.getSales();

                }).catch(err=>{
                    this.$alert(err.response.data.message)
                })
                })
  
            },updateSale(){
                const data = {
                    "SoldDate":this.editDate,
                    "CutomerID":this.editCustomer,
                    "DriverID":this.editDriver || '',
                    "REFNO":this.REFNO
                }
                Sales.updateSale(data).then(res=>{
               console.log(res["data"]);
               this.editVisible  = false;
               this.$confirm("Successfully update Sales Information","SUCCESS","success");
            
            }).catch(err=>{
                this.editVisible = false;
                    this.$confirm("An Error occurred can't update","ERROR","error");
                    console.log(err);
                })
            }
    },  computed: {
    displayedItems () {
      return this.paginate(this.items);
    }, displayedListItems(){
      return this.paginateList(this.purchaseItemsList) 
    } 
  },
  watch: {
    items () {
      console.log(this.items);
      this.setPages();
    },
    purchaseItemsList(){
      this.setPagesList();
    }
  },created(){
        this.getSales();
        this.getCustomers();
         Driver.getDrivers().then(res=>{
               this.DriversList =  res["data"];
           }).catch(err=>{
               console.log(err.response.data.message);
           }) 
    }
}
</script>
<style>
    .router-view-container{
    padding:20px;
    background: #eee;
    width:100%;
    height:auto;
}
.router-view-nav a{
color:black;
text-decoration:none;
font-size:20px;
}
.router-view-nav{
    /* display: grid;
    place-items:center; */
}
.router-view-nav li{
    list-style: none;
    display: inline;
    background: rgb(11, 170, 96);
    color:white;
    padding:15px;
    text-align:center;
    border-radius:5px;
}
.add-purchase{
    margin-top:18px;
}
.add-purchase h3{
margin-left: 15px;
}
.txt-input{
    padding:15px;
    width:350px;
    border:none;
    display: block;
    margin:10px;
    cursor: pointer;
    border-bottom:2px solid rgb(11, 170, 96);
    background:white;
}
.btn-submit{
    margin:10px;
    width:120px;
    padding:15px;
    border:none;
    border-radius:15px;
    cursor:pointer;
    color:white;
    background: rgb(11, 170, 96);
    font-size:20px;
}
.form-contain{
    display: grid;
    place-items:center;
}
.view-items th{
padding:15px;
}
.view-items-header{
    background: rgb(11, 170, 96);
    color:white;
}
.view-items-container{
display: grid;
place-items: center;
}
.error{
    background:red;
}
</style>