<template>
    <div>
            <div class="router-view-container">
                <SubHeaderControl :links="links"/>
                <!-- Order edit pop up -->
                <vue-window-modal :active="editVisible"  title="Update Order" v-on:clickClose="editVisibleUpdate(false)" style="width:auto;height:auto;overflow-y:scroll;">
                        <form @submit.prevent="updateOrder">
                        <table class="view-items">
                            <tr class="view-items-header">
                                <th>
                                    Date
                                </th>
                                <th>
                                    Customer
                                </th>
                            </tr>
                    
                            <tr>
                                <td>
                                    <input type="date" v-model="editDate" required/>
                                </td>
                                <td>
                                    <select   v-model="editCustomer" required>
                                        <option  :key="x.CustomerID"  :value="x.CustomerID" v-for="x in CustomersList">{{getCustomerName(x.CustomerID)}} </option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button type="submit" class="btn-submit">
                                        Confirm
                                    </button>
                                </td>
                            </tr>
                        </table>
                        </form>
                </vue-window-modal>
                <!-- / Order edit pop up -->
                <!-- item Edit pop up -->
                <vue-window-modal title="Edit Item" :active="itemVisible" v-on:clickClose="updateItemVisible(false)" style="width:auto;height:auto;">
                        <form @submit.prevent="updateItem">
                            <label for="">Quantity</label>
                            <input  v-model="editQuantity" type="number" class="txt-input">
                            <label for="">PPP</label>
                            <input  v-model="editPPP" type="number" class="txt-input">
                            <button type="submit" class="btn-submit">
                                Update
                            </button>
                        </form>
                </vue-window-modal>
                <!-- /item Edit pop up -->
                <!-- printable Element -->
                <vue-window-modal title="Order List" :active="false" >
                <div class="router-view" id="printThis">
                <table class="view-items">
                    <tr class="view-items-header">
                      <th>
                        Itemtype
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
                    </tr>
                    <tr :key="x.ItemID"    v-for="x in listItems" >
                        <td>
                         {{getItemName(x.ItemID)}}
                        </td>
                        <td>{{x.PPP}}</td>
                        <td> {{x.Quantity}}  </td>
                       <td> {{x.Total}} </td>
                     
                    </tr>
                </table>
                </div>
                  </vue-window-modal>
                <!-- /printable Element -->
                <!-- list Items View -->
         <vue-window-modal title="Order List" :active="listVisible" v-on:clickClose="updateListView(false)" style="width:auto;height:auto;">
                <div class="router-view">
                <table class="view-items">
                    <tr class="view-items-header">
                      <th>
                        Itemtype
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
                        change
                    </th>
                    </tr>
                    <tr :key="x.ItemID"    v-for="x in listItems" >
                        <td>
                         {{getItemName(x.ItemID)}}
                        </td>
                        <td>{{x.PPP}}</td>
                        <td> {{x.Quantity}}  </td>
                       <td> {{x.Total}} </td>
                       <td>
                        <button  @click="editItemView(x.ItemID,x.OrderditemID)" class="btn-submit-mini">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button  @click="removeItem(x.OrderditemID)" class="btn-submit-mini err">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                       </td>
                    </tr>
                </table>
                </div>
                  </vue-window-modal>
                <!-- / list Items View -->
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
                                Date
                            </th>
                            <th>
                                Customer
                            </th>
                            <th>
                                Order Type
                            </th>
                            <th>
                                Total
                            </th>
                             <th>
                           Items
                             </th>

                            <th>
                                Change
                            </th>
                            <th>
                                Print
                            </th>
                            </tr>
                        <tr   class="clickable" :key="x.OrderId" v-for="x in items">
                         <td  @click="viewItemWithId($event)" >
                             {{x.OrderDate}}
                         </td>
                         <td  @click="viewItemWithId($event)" >
                             {{getCustomerName(x.CutomerID)}}
                         </td >
                         <td @click="viewItemWithId($event)" >
                             SALES
                         </td>
                         <td>
                             {{getTotal(x.OrderID)}}
                         </td>
                         <td>
                             <button class="btn-submit-mini" @click="itemsView(x.OrderID)">
                                 <i class="fas fa-eye"> </i>
                             </button>
                         </td>
                           <td>  
                               <button  @click="editOrderView(x.OrderID)" class="btn-submit-mini">
                                <i class="fas fa-edit">
                                </i>
                                </button>    <button class="btn-err" @click.prevent="removeOrder(x.OrderID)"><i class="fas fa-trash-alt"></i></button></td>
                       <td>
                           <button   @click="printView(x.OrderID)" class="btn-submit-mini">
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
import Orders from "@/api_calls/Orders.js";
import Customer from "@/api_calls/Customer.js";
import Items from "@/api_calls/Items.js";
export default {
    name:"ViewOrder",
    components:{
        SubHeaderControl
    },
    methods:{
        getTotal(id){
            const items = this.items.filter(item=>{
                return item.OrderID == id;
            })[0].Orderitems;
            let total = 0;
            for(const x in items){
                total+=items[x].Total;
            }
            return total;
        },
        printView(id){
              this.listItems = this.items.filter(item=>{
                return item.OrderID == id;
            })[0].Orderitems;
            console.log("print check",this.listItems);
            this.$htmlToPaper("printThis");
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
             clearForm(){
        this.customerFilter="";
     
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
      if (deliveredLower) {
        this.items = this.tempItems.filter(item => {
          return item.DeliverdDate == this.deliveredDateFilterLower;
        });
      }
      if (purchaseLower) {
        this.items = this.tempItems.filter(item => {
          return item.OrderDate == this.dateFilterLower;
        });
     
      }
      // two variables
      if (purchaseLower && purchaseUpper) {
        this.items = this.tempItems.filter(item => {
          const d1 = new Date(this.dateFilterUpper);
          const d2 = new Date(item.OrderDate);
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
            return item.OrderDate == this.dateFilterLower;
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
            return item.OrderDate == this.dateFilterLower;
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
            const d2 = new Date(item.OrderDate);
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
            return item.OrderDate == this.dateFilterLower;
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
            const d2 = new Date(item.OrderDate);
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
            return item.OrderDate == this.dateFilterLower;
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
            const d3 = new Date(item.OrderDate);
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
            const d3 = new Date(item.OrderDate);
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
                console.log("cel",this.tempItems);
   
      this.setPages();
    },
        removeItem(id){
      this.updateListView(false);
      this.$confirm("Are you sure? removing Item can not be undone!!").then(()=>{
      Orders.removeItemList(id).then(()=>{
          this.getSalesOrders();
          this.updateListView(false);
          this.$alert("Item Removed!!","SUCCESS","success");
      }).catch(err=>{
        

          this.updateListView(false);

          this.$alert(err.response.data.message,"ERROR","error");
      })
  })
        },
        updateItem(){
          const data = {
            "PPP":this.editPPP,
            "Quantity":this.editQuantity,
            "OrderditemID":this.editableItemOrder
          }
          Orders.updateOrderItem(data).then(res=>{
              this.updateItemVisible(false);
              this.$alert("Item Updated!!","SUCCESS","success")
            console.log(res);
          }).catch(err=>{
              this.updateItemVisible(false);

              this.$alert(err.response.data.message,"ERROR","error");
          })
        },
        updateItemVisible(state){
            this.itemVisible = state;
        },
        editItemView(id,OID){
        this.itemVisible = true;
        this.editableItem = id;
        this.editableItemOrder = OID;
        const editable = this.listItems.filter(item=>{
            return item.ItemID == id;
        })[0];
        this.editPPP = editable.PPP;
        this.updateListView(false);
        this.editQuantity = editable.Quantity;  
        console.log("check Data",editable);
        },
    getItems() {
      Items.getItems()
        .then(res => {
          this.ItemsList = res["data"];
        })
        .catch(err => console.log(err));
    },getItemName(id){

        for(const x in this.ItemsList){
            console.log("list Item",this.ItemsList);
            console.log("id",id);
            if(this.ItemsList[x].ItemID == id ){
                return this.ItemsList[x].ItemType;
            }
        }
       
    },
        updateListView(state){
        this.listVisible = state;
        },
        itemsView(id){
            this.listItems = this.items.filter(item=>{
                return item.OrderID == id;
            })[0].Orderitems;
            this.listVisible =  true;
       
         
        },
        editVisibleUpdate(state){
            this.editVisible =  state;
                this.editDate =  "";
             this.editCustomer =  "";
    
             this.editableOrder ='';
        },
        editOrderView(id){
            const itemEditable =  this.items.filter(item=>{
                return item.OrderID == id;
            })[0];

            console.log("important",itemEditable);
             this.editDate =  itemEditable.OrderDate;
             this.editCustomer =  itemEditable.CutomerID;
             this.editVisible = true;
             this.editPurchaseVisible =  true;
             this.editableOrder = id;
        },
        viewWithId(){
          this.visibleFormCrud=true
        },
        visibleFormCrudUpdate(status){
            this.visibleFormCrud=status;
        },
        visibleFormCrudTwoUpdate(status){
            this.visibleFormCrudTwo = status;
        },
        viewItemWithId(e){
            e.stopPropagation();
            
          this.visibleFormCrudTwo =  true;  
        },
    
        getSalesOrders(){
            Orders.getSalesOrders().then(res=>{
                this.items=res["data"];
                this.tempItems = res["data"];
            }).catch(err=>{
                console.log(err);
            })
        },
        getCustomerName(id){
            for(const x in this.CustomersList ){
                if(this.CustomersList[x].CustomerID == id){
                    return this.CustomersList[x].CustomerName;
                }
            }
        },
        removeOrder(id){
            this.$confirm("Are you sure? removing Order can not be undone!!").then(()=>{
              Orders.removeOrder(id).then(res=>{
                this.items = this.items.filter(item=>{return item.OrderID != id})
                this.$alert("Order Updated","SUCCESS","success");
                console.log(res);
                }).catch(
                   
                err=>{
                     this.$alert(err.response.data.message,"ERROR","error");
                     }
            )
            })
          
        },
        updateOrder(){
                const data = {
                "CustomerId":this.editCustomer,
                ".OrderDate":this.editDate,
                "OrderID":this.editableOrder
                }
                Orders.UpdateOrder(data).then(res=>{
                    this.editVisible = false;
                    this.$alert("Order Updated!!","SUCCESS","success");
                    console.log(res);
                }).catch(err=>{
                    this.editVisible = false;

                        this.$alert(err.response.data.message,"ERROR","error");
                });
        }
    }
    ,
    data(){
        return {
            page:1,
            pages:[],
            perPage:5,
            transactionFilter:'',
            customerFilter:'',
            editableItemOrder:'',
            dateFilterUpper:'',
            dateFilterLower:'',
            
            editPPP:'',
            editQuantity:'',
            editableItem:'',
            itemVisible:false,
            ItemsList:[],
            listItems:[],
            editableList:[],
            listVisible:false,
            editPurchaseVisible:false,
            items:[],
            editVisible:false,
            editDate:'',
            editCustomer:'',
            editableOrder:'',
            CustomersList:[],
    links:
               [
                
                   {
                       id:2,
                       address:"viewOrder",
                       displayText:"Orders"
                   },{
                    id:1,
                    address:"addOrder",
                    displayText:"Add Order"
                   }
               ]
,
visibleFormCrud:false,
visibleFormCrudTwo:false
        }
    },  computed: {
    displayedItems () {
      return this.paginate(this.items);
    }
  },
  watch: {
    items () {
      console.log(this.items);
      this.setPages();
    }
  }
    ,created(){
    this.getItems();
    this.getSalesOrders();
   // get Customer data
   Customer.getCustomers().then(
        res=>{
            this.CustomersList = res["data"];
           
        }
    ).catch(err=>{console.log(err)})
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
.clickable{
    cursor:pointer;
    background:white;
    font-weight:bolder;
}
</style>