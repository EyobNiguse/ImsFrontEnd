<template >
    <div class="router-view-container">
        <SubHeaderControl :links="links"/>
<!-- add grn settlement -->
<vue-window-modal :active="addVisible"  title="Add Credit Settlement" v-on:clickClose="addVisibleUpdate(false)" style="width:auto;height:auto;overflow-y:scroll;">
<form @submit.prevent="addGRNCreditSettlement">
<table class="view-items">
    <tr class="view-items-header">
        <th>
            Date
        </th>
        <th>
            Payment
        </th>
    </tr>
    <tr>
    <td>
        <input type="date"  v-model="addDate" required/>
    </td>
    <td>
        <input type="number" min="0"  v-model="addPayment"  placeholder="Payment" required/>

    </td>
  </tr>
  <tr>
      <td>
          <button class="btn-submit">
              ADD
          </button>
      </td>
  </tr>
</table>
</form>
</vue-window-modal>
<!-- /add grn settlement -->


        <!-- view hdetails pop up -->
<vue-window-modal :active="listVisible" title="Credit Transaction" v-on:clickClose="listVisibleUpdate(false)" style="width:auto;height:auto;">
<table class="view-items">
<tr class="view-items-header">
 
<th>
    Date
</th>
<th>
    Payment
</th>
<th>
    Change
</th>
</tr>
<tr     :key="x.CSID" v-for="x in creditSettlement">
    <td>
        {{x.Date}}
    </td>
    <td>
        {{x.Payment}}
    </td>
    <td>
        <button @click="editView(x.CSID)" class="btn-submit-mini">
            <i class="fas fa-edit">

            </i>
        </button>
        <button  @click="removeCreditSettlement(x.CSID,x.GRNNO)"  class="btn-err">
            <i class="fas fa-trash-alt">

            </i>
        </button>
    </td>
</tr>
</table>



</vue-window-modal>

        <!-- /view details pop up -->
        <!-- edit Credit Pop Up -->
        <vue-window-modal :active="editVisible" title="update Purchase Credit" v-on:clickClose="editVisibleUpdate(false)" style="width:auto;height:auto;">
    <form @submit.prevent="updateGRNCredit">
        <table class="view-items">
            <tr class="view-items-header">
                <th>
                Date    
                </th> 
                
                <th>
                 Payment
                </th>
            </tr>
            <tr>
                <td>
                    <input type="date" v-model="editDate" >
                </td>
                <td>
                    <input type="number" min="0" v-model="editPayment" placeholder="Payment"  required/>
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
    
        <!-- /edit Credit pop up -->
               <div class="router-view">
            <div class="add-purchase">
   
            <fieldset class="view-items-container">
                    <legend> <h3> Purchase Credits</h3></legend>
                    <table class="view-items">
                        <tr class="view-items-header">
                            
                            <th>
                                GRNNO
                            </th>
                                 <th>
                                PurchasedDate
                            </th>
                            <th>
                                Total
                            </th>
                            <th>
                                    Paid
                            </th>
                          
                            <th>
                                Settlement 
                            </th>
                          
                        </tr>
                      <tr   v-bind:key="x.GRNNO" v-for="(x) in creditSettlements"> 
                          <td>
                         {{x.GRNNO}}     
                         </td> 
                   
                          <td>{{x.Date}}</td>
                          <td>
                              {{x.Total  || "_"}}
                          </td>
                          <td>
                              {{x.Paid}}
                          </td>
                          <td>   <button  @click="getcreditSettlement(x.GRNNO)" class="btn-submit-mini"> <i class="fas fa-eye"></i> </button>  <button  @click="addGRNCreditSettlementView(x.GRNNO)" class="btn-submit-mini" :disabled="x.Total == x.Paid">
                               <i :class=" x.Total == x.Paid? 'far fa-check-circle': 'fas fa-money-bill-wave'"></i> 
                               </button></td>
                   
                      </tr>
                    </table>
                </fieldset>
            </div>
         
        </div>
    </div>
</template>
<script>
import SubHeaderControl from "@/components/SubHeaderControl.vue";
import Credit from "@/api_calls/Credit.js";
import Suppliers from "@/api_calls/Supplier.js";
export default {
name:"AddLoadingExpense",
components:{
    SubHeaderControl
} ,
data(){
    return{
        addVisible:false,
        addDate:'',
        addPayment:'',
        Payment:'',
        grnNumber:'',
        editPayment:'',
        settlementDate:'',
        listVisible:false,
        creditSettlement:[],
        GRNNO:'',
        SupplierID:'',
        editVisible:false,
        editableCredit:'',
        editDate:'',
        editmainder:'',
        items:[],
        billDate:'',
        Suppliers:[],
        creditSettlements:[],
       Cost:'',
        
        
        links:[
        {
            id:0,
            address:"grnCredit",
            displayText:"Purchase Credit"
        },{
            id:1,
            address:"refCredit",
            displayText:"Sales  Credit"
        }
    ]
}},
methods:{
 
addGRNCreditSettlement(){
    const data = {
    "GRNNO":this.GRNNO,
    "Date":this.addDate,
    "Payment":this.addPayment
    };
    Credit.addGRNCreditSettlement(data).then(res=>{
   this.getGRNsettlements(); 
   this.addVisible = false;
     console.los(res);
    }).catch(err=>{
        console.log(err.response);
        alert(err.response.data.message)});

},
removeCreditSettlement(id,GRN){
    const data = {
        "GRNNO":GRN,
        "CSID":id
    }
    Credit.removeCreditSettlement(data).then(res=>{
        this.creditSettlement = this.creditSettlement.filter(item=>{return item.CSID != id});
        console.log(res);
    }).catch(err=>console.log(err));
}, 
getGRNsettlements(){
    Credit.getGRNsettlements().then(res=>{
        this.creditSettlements =  res["data"];
    })
}, getSupplierName(id){
    for(const x in this.Suppliers){
        if(this.Suppliers[x].GRNNO == id){
            return this.Suppliers[x].SupplierName;
        }
    }
},
updateCreditView(id,grn){
    console.log("check here", id);
    this.editVisible=true;
    this.editableCredit = id;
    this.GRNNO = grn;
    const dt = this.creditSettlements.filter(item=>{return item.CSID == id})[0];
    console.log("this is to be checked", dt);
    this.editDate = dt.Date;
    this.editmainder = dt.remainder  || "";

},updateGRNCreditSettlement(){
    const data = {
    "GRNNO":this.GRNNO,
    "Payment":this.editPayment,
    "CSID":this.SupplierID,
    "Date":this.Date
    }
    Credit.updateGRNCreditSettlement(data).then(res=>{
        console.log(res["data"])
        this.getGRNsettlements();
        this.editDate = "";
        this.editmainder = "";
        this.editVisible=false;
    }).catch(err=>{
        alert(err.response.data.message)
    })
},editVisibleUpdate(state){
    this.editVisible = state;
},getSuppliers(){
    Suppliers.getSuppliers().then(
        res=>{this.Suppliers=res["data"]} 
    ).catch(err=>{
        alert(err.response.data.message);
    })
},updateGRNCredit(){
    const data = {
    "GRNNO":this.GRNNO,
    "Payment":this.editPayment,
    "CSID":this.editableCredit,
    "Date":this.editDate
    }
    console.log(data); 
      Credit.updateGRNCredit(data).then(res=>{
    this.getGRNsettlements();
    this.editVisible =  false;
    this.editPayment = "";
    this.editableCredit="";
    this.editDate="";

   console.log(res["data"]);
   }).catch(err=>{
       alert(err.response.data.message);
       })

},
getcreditSettlement(id){
Credit.getcreditSettlement(id).then(res=>{this.creditSettlement = res["data"]}).catch(err=>{
    this.creditSettlement = "";
    alert(err.response.data.message)});
    this.listVisible =  false;
this.listVisible =  true;
},listVisibleUpdate(state){
 this.listVisible =  state;   
},
editView(id){
    this.editableCredit = id;
    this.editVisible =  true;
    this.listVisible= false;
    this.GRNNO = this.creditSettlement.filter(item=>{return item.CSID ==  id})[0].GRN[0].GRNNO;
    this.editDate = this.creditSettlement.filter(item=>{return item.CSID ==  id})[0].Date;
    this.editPayment = this.creditSettlement.filter(item=>{return item.CSID ==  id})[0].Payment;
    
},
addGRNCreditSettlementView(id){
    this.GRNNO = id;
    this.addVisible =  true;
},
addVisibleUpdate(state){
this.addVisible =  state;
}


},
created(){

this.getGRNsettlements();
}
}
</script>
<style >

</style>