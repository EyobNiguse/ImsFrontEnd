<template>
  <div>
    <div class="router-view-container">
      <SubHeaderControl :links="links" />
      <div class="router-view">
        <div class="add-purchase">
          <fieldset class="form-contain">
            <legend>
              <h3>Search Purchase</h3>
            </legend>
            <table>
              <tr>
                <td>
                  <label for="supplier">
                    <h3>Supplier</h3>
                  </label>
                  <select
                    v-model="supplierFilter"
                    name="supplier"
                    id
                    class="txt-input"
                    @change="filter"
                  >
                    <option value>---select Supplier---</option>
                    <option
                      :key="x.SupplierID"
                      v-for="x in supplierList"
                      :value="x.SupplierID"
                    >{{x.SupplierName}}</option>
                  </select>
                </td>
                <td>
                  <label for="purchaseType">
                    <h3>Purchase type</h3>
                  </label>
                  <select
                    v-model="transactionFilter"
                    name="purchaseType"
                    id
                    class="txt-input"
                    @change="filter"
                  >
                    <option value>-- select Type--</option>
                    <option value="1">cash</option>
                    <option value="2">Credit</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th colspan="2">
                  <h2 style="text-decoration:underline;">Purchase Date</h2>
                </th>
              </tr>
              <tr>
                <td>
                  <label for="purchaseDate">
                    <h3>From</h3>
                  </label>
                  <input
                    v-model="purchaseDateFilterLower"
                    type="date"
                    class="txt-input"
                    name="purchaseDate"
                    placeholder="GRN NO"
                    @input="filter"
                  />
                </td>
                <td>
                  <label for="purchaseDate">
                    <h3>to</h3>
                  </label>
                  <input
                    v-model="purchaseDateFilterUpper"
                    type="date"
                    class="txt-input"
                    name="deliveryDate"
                    @input="filter"
                  />
                </td>
              </tr>
              <tr>
                <th colspan="2">
                  <h2 style="text-decoration:underline;">Delivered Date</h2>
                </th>
              </tr>
              <tr>
                <td>
                  <label for="purchaseDate">
                    <h3>From</h3>
                  </label>
                  <input
                    v-model="deliveredDateFilterLower"
                    type="date"
                    class="txt-input"
                    name="purchaseDate"
                    placeholder="GRN NO"
                    @input="filter"
                  />
                </td>
                <td>
                  <label for="purchaseDate">
                    <h3>To</h3>
                  </label>
                  <input
                    v-model="deliveredDateFilterUpper"
                    type="date"
                    class="txt-input"
                    name="deliveryDate"
                    @input="filter"
                  />
                </td>
              </tr>
            </table>
          </fieldset>

          <!-- edit pop up -->

          <vue-window-modal
            :active="editVisible"
            title="Edit Purchase"
            v-on:clickClose="closeEditPurchase(false)"
            style="width:auto;height:auto;"
          >
            <form @submit.prevent="updateGRN()">
              <table class="view-items">
                <tr class="view-items-header">
                  <th>Purchase Date</th>
                  <th>Delivered Date</th>
                  <th>Supplier</th>
                  <th>Driver</th>
                </tr>

                <tr :key="y.GRNNO" v-for="y in editablePurchase">
                  <td>
                    <input v-model="editPurchaseDate" type="date" />
                  </td>
                  <td>
                    <input v-model="editDeliveredDate" type="date" />
                  </td>
                  <td>
                    <select v-model="editSupplierName" id>
                      <option
                        :key="x.SupplerID"
                        :value="x.SupplierID"
                        v-for="x in supplierList"
                      >{{x.SupplierName}}</option>
                    </select>
                  </td>

                  <td>
                    <select v-model="editDriver" name id>
                      <option
                        :key="x.DriverID"
                        :value="x.DriverID"
                        v-for="x in driverList"
                      >{{x.DriverName}}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <button class="btn-submit" type="submit">Confirm</button>
                </tr>
              </table>
            </form>
          </vue-window-modal>

          <!-- /edit pop up -->

          <!-- edit Item pop up -->

          <vue-window-modal
            :active="editItemVisible"
            title="Update Purchase Item"
            v-on:clickClose="closeEditItem(false)"
            style="width:auto;height:auto;"
          >
            <form @submit.prevent="updatePurchase">
              <table class="view-items">
                <tr class="view-items-header">
                  <th>PPP</th>
                  <th>Quantity</th>
                  <th>Extra</th>
                  <th>Remainding</th>
                </tr>
                <tr>
                  <td>
                    <input v-model="editPPP" type="number" placeholder="PPP" required />
                  </td>
                  <td>
                    <input v-model="editQuantity" type="number" placeholder="Quantity" required />
                  </td>
                  <td>
                    <input v-model="editExtra" type="number" placeholder="Extra" value="0" required />
                  </td>

                  <td>
                    <input
                      v-model="editRemainder"
                      type="number"
                      placeholder="Remaining"
                      value="0"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <button class="btn-submit">Confirm</button>
                  </td>
                </tr>
              </table>
            </form>
          </vue-window-modal>

          <!--/ edit Item pop UP  -->
          <!-- list pop up -->
          <vue-window-modal
            :active="listVisible"
            title="List Purchase items"
            v-on:clickClose="closeList(false)"
            style="width:auto;height:auto;"
          >
            <table class="view-items">
              <tr class="view-items-header">
                <th>GRNNO</th>
                <th>PPP</th>
                <th>Quantity</th>
                <th>Extra</th>
                <th>Remainder</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
              <tr :key="x.ItemID" v-for="x in displayedListItems">
                <td>{{x.GRNNO}}</td>
                <td>{{x.PPP}}</td>
                <td>{{x.Quantity}}</td>
                <td>{{x.Extra}}</td>
                <td>{{x.Remainder}}</td>
                <td>{{x.Total}}</td>

                <td>
                  <button class="btn-submit-mini" @click="editItemView(x.PurchaseID,x.GRNNO)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn-err" @click="removeItem(x.PurchaseID,x.GRNNO)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </table>
                        <span >
                <span class='prev'>
                    <button  v-if="pageList != 1" @click="pageList--"  class='btn-submit'>
                            Previous
                    </button>
                    </span>
                    <span class='number'>
                        <button  class='btn-submit-page'  :key='pageNumber' v-for="pageNumber in pagesList.slice(pageList-1, pageList+5)" @click="pageList = pageNumber">{{pageNumber}}</button>
                    </span>
                    <span class='next'>
                        <button @click="pageList++" v-if="pageList < pagesList.length"  class='btn-submit'>
                            Next
                        </button>
                    </span>
                    
            </span>
          </vue-window-modal>
          <!-- /list pop up -->
          <fieldset class="view-items-container">
            <legend>
              <h3>Items List</h3>
            </legend>
            <table class="view-items">
              <tr class="view-items-header">
                <th>GRNNO</th>
                <th>Purchase Date</th>
                <th>Delivered Date</th>
                <th>Supplier Name</th>
                <th>Item Type Count</th>
                <th>CHANGE</th>
              </tr>
<!-- 
              <tr :name="x.GRNNO" v-bind:key="index" v-for="(x,index) in items" v-show="filterView">
                <td>{{x.GRNNO}}</td>
                <td>{{x.PurchsedDate}}</td>
                <td :class="x.Delivered==true?'':'missing-delivery'">{{x.DeliverdDate}}</td>
                <td>{{getSupplierName(x.SupplierID)}}</td>
                <td>
                  <button
                    class="btn-submit"
                    @click="viewPurchaseItems(x.GRNNO)"
                  >List ({{x.Purchase.length}})</button>
                </td>
                <td>
                  <button class="btn-submit-mini" @click="editPurchaseView(x.GRNNO)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn-err" @click="removePurchase(x.GRNNO)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr> -->

                <tr :name="x.GRNNO" v-bind:key="index" v-for="(x,index) in displayedItems" >
                <td>{{x.GRNNO}}</td>
                <td>{{x.PurchsedDate}}</td>
                <td :class="x.Delivered==true?'':'missing-delivery'">{{x.DeliverdDate}}</td>
                <td>{{getSupplierName(x.SupplierID)}}</td>
                <td>
                  <button
                    class="btn-submit"
                    @click="viewPurchaseItems(x.GRNNO)"
                  >List ({{x.Purchase.length}})</button>
                </td>
                <td>
                  <button class="btn-submit-mini" @click="editPurchaseView(x.GRNNO)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn-err" @click="removePurchase(x.GRNNO)">
                    <i class="fas fa-trash-alt"></i>
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
import Purchase from "@/api_calls/Purchase.js";
import Suppliers from "@/api_calls/Supplier.js";
import Driver from "@/api_calls/Driver.js";
export default {
  name: "AddPurchase",
  components: {
    SubHeaderControl
  },
  data() {
    return {
      driverList: [],
      editableItem: [],
      editQuantity: "",
      purchaseDateFilterLower: "",
      purchaseDateFilterUpper: "",
      deliveredDateFilterLower: "",
      deliveredDateFilterUpper: "",
      editRemainder: "",
      editPPP: "",
      editExtra: "",
      editDriver: "",
      editRemaining: "",
      editItemVisible: false,
      listVisible: false,
      supplierFilter: "",
      transactionFilter: "",
      fitlerContent: [],
      dateFilter: "",
      supplierList: [],
      purchaseItemsList: [],
      purchaseDateFilter: "",
      deliveredDateFilter: "",
      editPurchaseDate: "",
      editDeliveredDate: "",
      editSupplierName: "",
      editVisible: false,
      filterView:false,
      editablePurchase: [],
      editDriverID: "",
      pagesList:[],
      items: [],
      tempItems: [],
      purchaseEdit: [],
      page: 1,
      pageList:1,
      perPage: 5,
      pages: [],
      pagedItems:[],
      links: [
        {
          id: 1,
          address: "viewPurchase",
          displayText: "Purchases"
        },
        {
          id: 0,
          address: "addPurchase",
          displayText: "Add Purchase"
        }
      ]
    };
  },
  methods: {
    getPurchase() {
      Purchase.getGRN().then(res => {
        this.items = res["data"];
        this.tempItems = res["data"];
        this.pagedItems = res["data"];
      });
    },
    getSuppliers() {
      Suppliers.getSuppliers().then(res => {
        this.supplierList = res["data"];
      });
    },
    getSupplierName(id) {
      for (const x in this.supplierList) {
        if (this.supplierList[x].SupplierID == id) {
          // console.log("check value here");

          return this.supplierList[x].SupplierName;
        }
      }
    },
    filter() {
      const filterValues = [
        this.supplierFilter,
        this.transactionFilter,
        this.purchaseDateFilterLower,
        this.purchaseDateFilterUpper,
        this.deliveredDateFilterLower,
        this.deliveredDateFilterUpper
      ];7
      this.filterView = true;
      let notEmpty = [];
      let supplier = false;
      let transaction = false;
      let purchaseLower = false;
      let purchaseUpper = false;
      let deliveredLower = false;
      let deliveredUpper = false;
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
            break;
          case 1:
            transaction = true;
            break;
          case 2:
            purchaseLower = true;
            break;
          case 3:
            purchaseUpper = true;
            break;
          case 4:
            deliveredLower = true;
            break;
          case 5:
            deliveredUpper = true;
            break;
        }
      }
      // one variable
      if (supplier) {
        this.items = this.tempItems.filter(item => {
          return item.SupplierID == this.supplierFilter;
        });
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
          return item.PurchsedDate == this.purchaseDateFilterLower;
        });
      }
      // two variables
      if (purchaseLower && purchaseUpper) {
        this.items = this.tempItems.filter(item => {
          const d1 = new Date(this.purchaseDateFilterUpper);
          const d2 = new Date(item.PurchsedDate);
          const d3 = new Date(this.purchaseDateFilterLower);
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
            return item.SupplierID == this.supplierFilter;
          })
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          });
      }
      if (supplier && purchaseLower) {
        this.items = this.tempItems
          .filter(item => {
            return item.SupplierID == this.supplierFilter;
          })
          .filter(item => {
            return item.PurchsedDate == this.purchaseDateFilterLower;
          });
      }
      if (supplier && deliveredLower) {
        this.items = this.tempItems
          .filter(item => {
            return item.DeliverdDate == this.deliveredDateFilterLower;
          })
          .filter(item => {
            return item.SupplierID == this.supplierFilter;
          });
      }
      if (purchaseLower && deliveredLower) {
        this.items = this.tempItems
          .filter(item => {
            return item.PurchsedDate == this.purchaseDateFilterLower;
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
            return item.SupplierID == this.supplierFilter;
          })
          .filter(item => {
            const d1 = new Date(this.purchaseDateFilterUpper);
            const d2 = new Date(item.PurchsedDate);
            const d3 = new Date(this.purchaseDateFilterLower);
            return d3 < d2 && d2 < d1;
          });
      }
      if (supplier && transaction && purchaseLower) {
        this.items = this.tempItems
          .filter(item => {
            return item.SupplierID == this.supplierFilter;
          })
          .filter(item => {
            return item.PurchsedDate == this.purchaseDateFilterLower;
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
            return item.SupplierID == this.supplierFilter;
          });
      }
      if (supplier && deliveredLower && transaction) {
        this.items = this.tempItems
          .filter(item => {
            return item.DeliverdDate == this.deliveredDateFilterLower;
          })
          .filter(item => {
            return item.SupplierID == this.supplierFilter;
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
            const d1 = new Date(this.purchaseDateFilterUpper);
            const d2 = new Date(item.PurchsedDate);
            const d3 = new Date(this.purchaseDateFilterLower);
            return d3 < d2 && d2 < d1;
          })
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          });
      }
      if (purchaseLower && deliveredLower && deliveredUpper) {
        this.items = this.tempItems
          .filter(item => {
            return item.PurchsedDate == this.purchaseDateFilterLower;
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
            return item.SupplierID == this.supplierFilter;
          })
          .filter(item => {
            const d1 = new Date(this.purchaseDateFilterLower);
            const d2 = new Date(this.purchaseDateFilterUpper);
            const d3 = new Date(item.PurchsedDate);
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
            return item.SupplierID == this.supplierFilter;
          })
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          });
      }
      if (supplier && transaction && deliveredLower && deliveredUpper) {
        this.items = this.tempItems
          .filter(item => {
            return item.SupplierID == this.supplierFilter;
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
            const d1 = new Date(this.purchaseDateFilterLower);
            const d2 = new Date(this.purchaseDateFilterUpper);
            const d3 = new Date(item.PurchsedDate);
            return d1 < d3 && d3 < d2;
          })
          .filter(item => {
            return item.SupplierID == this.supplierFilter;
          })
          .filter(item => {
            return item.TransactionID == this.transactionFilter;
          });
      }
      if (!supplier && !transaction && !purchaseLower && !deliveredLower) {
        this.items = this.tempItems;
        this.filterView = false;
      }
      console.log("this is ", transaction);
      this.setPages();
    },
    removePurchase(id) {
      this.$confirm("are you sure? Deleting a purchase can not be undone").then(
        ()=>{
  Purchase.removePurchase(id)
        .then(res => {
          this.$alert("Purchase Removed","SUCCESS",'success'); 
          this.items = this.items.filter(ele => {
            return ele.GRNNO != id;
          });
          console.log(res);
        })
        .catch(err => {
          this.$alert(err.response.data.message,"ERROR",'error');
        });
        }
      )
    
    },
    viewPurchaseItems(id) {
      this.listVisible = true;
      this.purchaseItemsList = this.items.filter(item => {
        return item.GRNNO == id;
      })[0].Purchase;
      // console.log(this.purchaseItemsList);
    },
    closeList(state) {
      this.listVisible = state;
      this.setPagesList();
    },
    editPurchaseView(id) {
      this.editVisible = true;
      this.editablePurchase = this.items.filter(item => {
        return item.GRNNO == id;
      });

      this.editPurchaseDate = this.editablePurchase[0].PurchsedDate;
      this.editDeliveredDate = this.editablePurchase[0].DeliverdDate;
      this.editSupplierName = this.editablePurchase[0].SupplierID;
      this.editDriver = this.editablePurchase[0].DriverID;
    },
    closeEditPurchase(state) {
      this.editVisible = state;
    },
    updateGRN() {
      const data = {
        PurchsedDate: this.editPurchaseDate,
        DeliverdDate: this.editDeliveredDate,
        SupplierID: this.editSupplierName,
        DriverID: this.editDriver || "",
        GRNNO: this.editablePurchase[0].GRNNO
      };
      //  console.log(data);
      Purchase.updateGRN(data)
        .then(res => 
        {
        this.closeEditPurchase(false);
        this.$alert("Purchase Updated","Success","success");
        console.log(res)}
        )
        .catch(err => {
          this.closeEditPurchase(false);
          this.$alert(err.response.data.message,"ERROR","error");

        });
    },
    editItemView(id, grn) {
      this.editItemVisible = true;
      this.editableItem = this.items
        .filter(item => {
          return item.GRNNO == grn;
        })[0]
        .Purchase.filter(itm => {
          return itm.PurchaseID == id;
        })[0];
      this.editQuantity = this.editableItem.Quantity;
      this.editRemainder = this.editableItem.Remainder;
      this.editExtra = this.editableItem.Extra;
      this.editPPP = this.editableItem.PPP;
      this.closeList(false);
      //  console.log("Editable Item",this.editableItem);
    },
    closeEditItem(state) {
      this.editItemVisible = state;
    },
    updatePurchase() {
      const data = {
        PPP: this.editPPP,
        Quantity: this.editQuantity,
        Remainder: this.editRemainder,
        Extra: this.editExtra,
        PurchaseID: this.editableItem.PurchaseID,
        GRNNO: this.editableItem.GRNNO
      };
      Purchase.updatePurchase(data)
        .then(res => {
          this.closeEditItem(false);
          this.$alert("Purchase Item Updated","SUCCESS",'success');
          console.log(res["data"]);
        })
        .catch(err => {
          this.closeEditItem(false);
          this.$alert(err.response.data.message,"ERROR",'error');
          console.log(err);
        });
    },
    removeItem(id, grn) {
      this.closeList(false);
      this.$confirm("Are you sure? deleting an Item can not be undone!").then(()=>{
     const data = {
        PurchaseID: id,
        GRNNO: grn
      };

      Purchase.removeItem(data)
        .then(res => {
         this.closeList(false);
          this.$alert("Item Removed","SUCCES",'success');
          console.log(res["data"]);
        })
        .catch(err => {
          this.closeList(false);
          this.$alert(err.response.data.message,"ERROR",'error');
        });
      })
 
    },
    getDriverList() {
      Driver.getDrivers()
        .then(res => {
          this.driverList = res["data"];
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    setPages () {
      this.pages = [];
      let numberOfPages = Math.ceil(this.items.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },setPagesList(){
        this.pagesList = [];
        let numberOfPages = Math.ceil(this.purchaseItemsList.length / this.perPage);
        for (let index = 1; index <= numberOfPages; index++) {
        this.pagesList.push(index);
      }
      },
    paginate (pagedItems) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  pagedItems.slice(from, to);
    },paginateList(pagedItems){
      let page = this.pageList;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  pagedItems.slice(from, to);
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
      this.setPages();
    },
    purchaseItemsList(){
      this.setPagesList();
    }
  },
  created() {
    this.getPurchase();
    this.getSuppliers();
    this.getDriverList();
  },
  filters: {
    trimWords(value){
      return value.split(" ").splice(0,20).join(" ") + '...';
    }
  }
};
</script>
<style>
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
.min-input {
  width: 100%;
  border: none;
  padding: 10px;
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
.btn-submit {
  margin: 10px;
  width: 120px;
  padding: 15px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  color: white;
  background: rgb(11, 170, 96);
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
  background: white;
  cursor: pointer;
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
.missing-delivery {
  border-bottom: 2px solid rgb(255, 13, 4) !important;
  color: white;
  text-align: center;
}
.btn-submit-page{
    width:35px;
    padding:10px;
    background:white;
    cursor:pointer;
    border:none;   
    border-bottom:2px solid rgb(11, 170, 96);
    margin:1px;
   
}
</style>