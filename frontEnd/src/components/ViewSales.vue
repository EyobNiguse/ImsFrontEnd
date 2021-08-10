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
                                    <option :key="x.DriverID" v-for="x in DriversList">{{x.DriverName}}</option>
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
                                <tr  :key="x.ItemID"  v-for="x in SalesList">
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
                              Search Purchase
                        </h3>
                    </legend>
                    <table>
                
                        <tr>
                            <td>  <label for="supplier"> <h3>Supplier</h3></label>
                                <select v-model="SupplierID" name="supplier" id="" class="txt-input">
                                    <option :key="x.SupplierID" :value="x.SupplierID" v-for="x in SuppliersList">{{x.SupplierName}}</option>
                                 
                                 
            
                                </select></td> 
                            <td>
                                <label for="purchaseType"> <h3>Purchase type</h3></label>
                                <select name="purchaseType" id="" class="txt-input">
                                    <option value="Cash">cash</option>
                                    <option value="Credit">Credit</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                         <td>
                            <label for="purchaseDate"> <h3> Purchase Date </h3></label>
                            <input type="date" class="txt-input" name="purchaseDate" placeholder="GRN NO"  ></td>
                         <td>  <label for="purchaseDate"> <h3> Delivery Date </h3></label>
                            <input type="date" class="txt-input" name="deliveryDate"></td>
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
                        </tr>
                     <tr  :key="x.REFNO" :name="x.REFNO" v-for="x in items" >
                        <td>{{x.REFNO}}</td>
                          <td>{{x.Date}}</td>
                          <td> {{x.TransactionID==1?'Cash':'Credit'}}</td>
                          <td>{{getCustomerName(x.CutomerID)}}</td>
                          <td> <button  @click="listView(x.REFNO)" class="btn-submit-mini"><i class="fas fa-eye"></i></button></td>
                          <td>   <button  @click="editView(x.REFNO)" class="btn-submit-mini">  <i class="fas fa-edit"></i> </button> <button class="btn-err" @click="removeSales(x.REFNO)"><i class="fas fa-trash-alt"></i></button></td>
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
            editPPP:'',
            editID:'',
            editableSale:'',
            editQuantity:'',
            editVisibleItem:false,
            REFNO:'',
            editDate:'',
            editCustomer:'',
            editDriver:'',
            editVisible:false,
            DriversList:[],
             REFNNO:'',
            listVisible:false,
            items:[],
            SuppliersList:[],
            CustomersList:[],
            SalesList:[],
            SupplierID:'',
            links:[
                {
                    id:0,
                    address:"addSales",
                    displayText:"Add Sales",

                },{
                    id:1,
                    address:"viewSales",
                    displayText:"Sales"
                }
            ]
        }
    },methods:{
        getSuppliers(){
            Supplier.getSuppliers().then(res=>{
                this.SuppliersList =  res["data"]
            })
        },
        getSales(){
            Sales.getSales().then(res=>{
                this.items =  res["data"];
                
            })
        },
        getCustomerName(id){
            for(const x in this.CustomersList){
              if(this.CustomersList[x].CustomerID==id){
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
            this.SalesList = this.items.filter(item=>{return item.REFNO == id})[0].Sales;
        }
        ,listVisibleUpdate(state){
            this.listVisible= state;
        },editView(id){
            this.editVisible = true;
            this.REFNO = id;
           
         const dt = this.items.filter(item=>{
             return item.REFNO == id;
         })[0]
         console.log("check here", dt);
         this.editDate  = dt.Date;
         this.editCustomer =  dt.CutomerID;
          
       
       }, getDrivers(){
               },
            getCustomers(){
                Customer.getCustomers().then(res=>{
                    this.CustomersList = res["data"];
                }).catch(err=>{
                    this.$alert(err.response.data.message);
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
            const dt = this.SalesList.filter(item=>{return item.SalesId == id})[0]
            
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
    },created(){
        this.getSales();
        this.getCustomers();
         Driver.getDrivers().then(res=>{
               this.DriversList =  res["data"];
           }).catch(err=>{
               this.$alert(err.response.data.message);
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