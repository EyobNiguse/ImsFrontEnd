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
            <fieldset class="view-items-container" style="margin-top:30px">
                <legend>
                    <h3>
                        Search Settelements
                    </h3>
                </legend>
                <table>
                    <tr>
                        <td>
                            From
                        </td>
                        <td>
                            To
                        </td>
                        <td>ReFno</td>
                        <td>
                            <button @click="clearForm" class="btn-submit-mini">
                                X
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input  @change="filter" v-model="dateFilterLower"  type="date">
                        </td>
                        <td>
                            <input @change="filter"   type="date" v-model="dateFilterUpper">
                        </td>
                        <td>
                                <input   @input="filter" v-model="refFilter" type="number">

                        </td>
                    </tr>
                </table>
            </fieldset>
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
                            <th @click="sortTotal" style="cursor:pointer;"> 
                                Total
                            </th>
                            <th @click="sortPaid" style="cursor:pointer">
                                    Paid
                            </th>
                          
                            <th>
                                Settlement 
                            </th>
                          
                        </tr>
                      <tr   v-bind:key="x.GRNNO" v-for="(x) in displayedItems"> 
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
        dateFilterLower:'',
        dateFilterUpper:'',
        refFilter:'',
        pages:[],
        page:1,
        perPage:5,
        clicked:true,
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
        tempItems:[],
        billDate:'',
        Suppliers:[],
        items:[],
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
clearForm(){
this.dateFilterLower = "";
this.dateFilterUpper = "";
this.refFilter =  "";
this.filter();
},
 sortPaid(){
   if(this.clicked){
  this.items =  this.tempItems.sort((a,b)=>(a.Paid > b.Paid) ? 1 : -1);  

  }else{
  this.items = this.tempItems.sort((a,b)=>(a.Paid < b.Paid) ? 1 : -1);    
 
  }
this.clicked = !this.clicked;
 
  console.log(this.clicked);
 },
 sortTotal(){
 if(this.clicked){
  this.items =  this.tempItems.sort((a,b)=>(a.Total > b.Total) ? 1 : -1);  

  }else{
  this.items = this.tempItems.sort((a,b)=>(a.Total < b.Total) ? 1 : -1);    
 
  }
this.clicked = !this.clicked;
 
  console.log(this.clicked);
 },
 filter(){
//one variable
if(this.dateFilterLower!=""){
this.items = this.tempItems.filter(item=>{
    return item.Date == this.dateFilterLower;
})
}
if(this.refFilter!=""){
this.items =  this.tempItems.filter(item=>{
    return item.GRNNO ==  this.refFilter;
}) 
}

//two Variable
if(this.dateFilterLower!="" && this.dateFilterUpper !=""){
  this.items = this.tempItems.filter(item=>{
      const d1 =  new Date(this.dateFilterUpper);
      const d2 =  new Date(item.Date);
      const d3  = new Date(this.dateFilterLower);
      return  d3 < d2 && d2 < d1;
  });
 }
if(this.dateFilterLower=="" && this.dateFilterUpper=="" && this.refFilter ==""){
    this.items =  this.tempItems;
}
 },
addGRNCreditSettlement(){
    const data = {
    "GRNNO":this.GRNNO,
    "Date":this.addDate,
    "Payment":this.addPayment
    };
    Credit.addGRNCreditSettlement(data).then(res=>{
   this.getGRNsettlements(); 
   this.addVisible = false;
   this.$alert("Credit Settelement Added","SUCCESS","success");
     console.los(res);
    }).catch(err=>{
        this.addVisible = false;
        console.log(" we are here");
        this.$alert(err.response.data.message,"ERROR","error");
       });

},
removeCreditSettlement(id,GRN){
    this.listVisibleUpdate(false);
    this.$confirm("Are you sure?  removing Credit Transaction can not be undone").then(()=>{
    const data = {
        "GRNNO":GRN,
        "CSID":id
    }
    Credit.removeCreditSettlement(data).then(res=>{
         this.listVisibleUpdate(false);
       this.items = this.items.filter(item=>{return item.CSID != id});
        this.$alert("Transaction Removed","SUCCESS","success");
        this.getGRNsettlements();
        console.log(res);
    }).catch(err=>{
        this.$alert(err.response.data.message,"ERROR","error");
        })
    })
;
}, 
getGRNsettlements(){
    Credit.getGRNsettlements().then(res=>{
        this.items =  res["data"];
        this.tempItems =  res["data"];
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
    const dt = this.items.filter(item=>{return item.CSID == id})[0];
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
        this.$alert("Credit Settlement Updated","SUCCESS","success");
    }).catch(err=>{
        this.$alert(err.response.data.message,"ERROR","error");
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
    this.$alert("Credit Settlement updated","SUCCESS","success");
    this.editPayment = "";
    this.editableCredit="";
    this.editDate="";

   console.log(res["data"]);
   }).catch(err=>{
        this.editVisible =  false;
    this.$alert(err.response.data.message,"ERROR","error");
  
       })

},
getcreditSettlement(id){
Credit.getcreditSettlement(id).then(res=>{this.creditSettlement = res["data"]}).catch(err=>{
   this.items = "";
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
    this.GRNNO =this.items.filter(item=>{return item.CSID ==  id})[0].GRN[0].GRNNO;
    this.editDate =this.items.filter(item=>{return item.CSID ==  id})[0].Date;
    this.editPayment =this.items.filter(item=>{return item.CSID ==  id})[0].Payment;
    
},
addGRNCreditSettlementView(id){
    this.GRNNO = id;
    this.addVisible =  true;
},
addVisibleUpdate(state){
this.addVisible =  state;
}
,    setPages () {
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
    }

},
  watch: {
    items () {
      this.setPages();
    }
    
  },computed:{
      displayedItems(){

          return this.paginate(this.items);
      }
  },
created(){
this.getGRNsettlements();
}
}
</script>
<style >

</style>