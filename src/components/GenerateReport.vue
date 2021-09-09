<template>
       <div id="main">
         <div id="sub1">
         <div id="top-notice">
           <table>
             <tr>
<td>
 <label for="">   
           <h3>
            Starting Date
           </h3>
           </label>
            <input type="date" v-model="starting_date" class="txt-input" />
</td>
<td>

            <label for=""> Ending Date</label>
             <input type="date" v-model="ending_date"  class="txt-input"/>
</td>
             </tr>
             <tr>
  <td>
             <select
          v-model="selected"
          name="report"
          id="report"
          @change="onChange($event)"
          class="txt-input">
          <option :key="i" v-for="i in report_type" :value="i">{{ i }}</option>
        </select>
  </td>
  <td>
   <button class="btn-submit" @click="generateReport()">   Generate  </button>
  </td>
             </tr>
           </table>      
         </div>

      
        <h1 id="center">Profit And Loss Calculator</h1>
       
          <table id="table">
            <thead>
              <tr>
                <th >Theading income</th>
                <th  >Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="key" v-for="(value, key) in this.data.final_report">
                <th >{{ key }}</th>
                <td >{{ value }} Birr</td>
              </tr>
            </tbody>
          </table>
       
       </div>
      <div  id="sub2" style="  overflow-y: scroll;
  height:100vh;">
        <div v-for="d,i in data" :key="i">
          <DynamicTable :Name="i" :data="d"></DynamicTable>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
var _ = require("lodash");
import DynamicTable from "./DynamicTable.vue";
 
export default {
  name: "GenerateReport",
  components: {
    DynamicTable,
  },
  data: function () {
    return {
      popButtons:[],
      selected: "fifo",
      starting_date: "2021-07-01",
      ending_date: "2021-09-29",
      report_type: ["fifo", "weighted"],
      data: [],
      options: {
        chart: {
          id: "vuechart-example",
          type: "line",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
        theme: {
          palette: "dark",
        },
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 0.5,
        },
      },
      series: [
        {
          name: "series-1",
          data: [0, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  methods: {
    calculate_total_sales() {
      return _.sumBy(this.data.REFERENCE, ({ Sales }) =>
        _.sumBy(Sales, "Total")
      );
    },
    calculate_total_other_income() {
      return _.sumBy(this.data.Incomes, "Amount");
    },
    calculare_gross_profit() {
      // return _.sumB(this.data.Individual_report,'Gross-Profit')
      return _.sumBy(this.data.individual_report, "Gross-Profit");
    },
    onChange() {
      var e = document.getElementById("report");
      this.selected = e.value;
    },
    async generateReport() {
      var data = JSON.stringify({
        date1: this.starting_date,
        date2: this.ending_date,
        option: this.selected,
      });

      var config = {
        method: "post",
        url: "http://localhost/ims/api/v1/report/get_all_report",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = axios(config);
      response
        .then((result) => {
          this.data = "";
          this.data = result.data;
           this.popButtons  = document.getElementsByClassName("popy");
           console.log("pop buttons",this.popButtons);
           
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async generate_report() {
      var data = JSON.stringify({
        date1: "2001-07-01",
        date2: "2021-07-25",
        option: "weighted",
      });

      var config = {
        method: "post",
        url: "http://localhost/ims/api/v1/report/get_all_report",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = axios(config);
      response
        .then((result) => {
          console.log(result.data);

          this.data = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateChart() {
      const max = 90;
      const min = 20;
      const newData = this.series[0].data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });
      // In the same way, update the series option
      this.series = [
        {
          data: newData,
        },
      ];
    },
  },created(){
    // this.popButtons =  document.getElementsByClassName("popy");
    
  },
  mounted() {},
};
</script>

<style scoped>
#top-notice{
display: inline-block;
width:100%;
}
#main{
  width:100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap:40px;

}
#sub1{
  grid-column: 1;
}
#sub2{
  width:100%;

}
#table{
  /* padding:25px; */
  width:100%;
}
#table thead{
 
    background: rgb(11, 170, 96);

  color:white;
}
#table thead th{
   padding:20px;
}
#table tbody th{
  text-align: left;
}
#table tbody td{
  padding:10px;
}
#table tr{
  /* padding:25px; */
  border-bottom:1px solid gray;
}
#center{
  text-align: center;
}
</style>