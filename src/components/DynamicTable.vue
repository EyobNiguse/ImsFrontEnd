<template>

  <div id="main1">
    <vue-window-modal :active="isPopup" title="Full Details" v-on:clickClose="updateIsPopup(false)">
   here
</vue-window-modal>
      <table >
        <thead>
          <tr>
            <th colspan="100%">
        <h1 id="center">{{ Name }}</h1>
            </th>
          </tr>
          <tr>
            <th v-for="k in columns" :key="k" scope="col">{{ k }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(d, i) in data" :key="i">
            <td v-for="row in d" :key="row">
              <button   class="btn-submit-mini popy" :hidden="!Array.isArray(row)">
               <i class="fas fa-external-link-alt"></i>
              </button>
              {{ Array.isArray(row) ? "" : row }}
            </td>
          </tr>
        </tbody>
    </table>
  
  </div>
</template>

<script>
export default {
  name: "DynamicTable",
  props: {
    Name: {
      Type: String,
      default: "Table",
    },
    data: {
      Type: Array,
      default: [],
    },
  },
  data(){
    return {
      isPopup:false,
      popUpData:[],
    }
  },methods:{
    popUP(data){
      this.popUPData = data;
    }
  },
  computed: {
    columns() {
      if (this.data.length > 0) {
        return Object.keys(this.data[0]);
      } else {
        return [];
      }
    },
  },
};
</script>

<style scoped>
#main1 table thead tr{
     background: rgb(11, 170, 96);

  color:white;
    border-radius:10px;
  /* padding:5px; */
}
#main1 table thead th{

  
  padding:10px;
}
#main1 table tbody td{
  padding:10px;
  border:none;
}
#center{
  text-align: center;
}
</style>