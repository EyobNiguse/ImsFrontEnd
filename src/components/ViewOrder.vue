<template>
    <div>
            <div class="router-view-container">
                <SubHeaderControl :links="links"/>
                <!-- Order edit pop up -->
                <vue-window-modal :active="editVisible"  v-on:clickClose="editVisibleUpdate(false)" style="width:auto;height:auto;overflow-y:scroll;">
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
                                        <option  :key="x.CustomerID"  :value="x.CustomerID" v-for="x in CustomersList">{{x.CustomerID}} </option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                </vue-window-modal>
                <!-- / Order edit pop up -->
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
                            <td>  <label for="supplier"> <h3>Customer</h3></label>
                                <select name="supplier" id="" class="txt-input">
                                    <option   :key="x.CustomerID" :value="x.CustomerID" v-for="x in CustomersList">{{x.CustomerName}}</option>
                              
                                </select></td> 
                            <td>
                                <label for="purchaseDate"> <h3> Order Date </h3></label>
                                <input type="date" class="txt-input" name="purchaseDate" placeholder="GRN NO">
                            </td>
                    
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
                                Total Orders
                            </th>
                            <th>
                                Order Type
                            </th>
                    
                            <th>
                                Change
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
                             {{x.Orderitems.length}}
                         </td>
                         <td @click="viewItemWithId($event)" >
                             SALES
                         </td>
                           <td>  
                               
                               <button  @click="editOrderView(x.OrderID)" class="btn-submit-mini">
                                <i class="fas fa-edit">

                                </i>
                                </button>    <button class="btn-err" @click.prevent="removeOrder(x.OrderID)"><i class="fas fa-trash-alt"></i></button></td>
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
import Orders from "@/api_calls/Orders.js";
import Customer from "@/api_calls/Customer.js";
export default {
    name:"ViewOrder",
    components:{
        SubHeaderControl
    },
    methods:{
        
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
                console.log(res["data"])
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
            Orders.removeOrder(id).then(res=>{
                this.items = this.items.filter(item=>{return item.OrderID != id})
                console.log(res)
                }).catch(
                err=>{alert(err.response.data.message)}
            )
        }
    }
    ,
    data(){
        return {
            items:[],
            editVisible:false,
            CustomersList:[],
    links:
               [
                
                   {
                    id:1,
                    address:"addOrder",
                    displayText:"Add Order"
                   },{
                       id:2,
                       address:"viewOrder",
                       displayText:"Orders"
                   }
               ]
,
visibleFormCrud:false,
visibleFormCrudTwo:false
        }
    }
    ,created(){
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