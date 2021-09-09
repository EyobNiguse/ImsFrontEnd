<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col float-left" >
        <div class="row">
          <div class="col">
            starting date <input type="date" v-model="starting_date" />
          </div>
          <div class="col">
            ending date <input type="date" v-model="ending_date" />
          </div>
        </div>

        <select
          v-model="selected"
          name="report"
          id="report"
          @change="onChange($event)"
        >
          <option :key="i" v-for="i in report_type" :value="i">{{ i }}</option>
        </select>
        <br />
        <br />

        <button class="btn-primary" @click="generateReport()">
          Generate Report
        </button>
        <h1>Profit And Loss Calculator</h1>
        <div class="container col-7">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" style="text-align: left">Theading income</th>
                <th scope="col" style="text-align: right">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="key" v-for="(value, key) in this.data.final_report">
                <th style="text-align: left" scope="row">{{ key }}</th>
                <td style="text-align: left">{{ value }} Birr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col float-right" style="overflow-y:scroll; height:100vh">
        <div v-for="d,i in data" :key="i" class="row mb-3">
          <DynamicTable :Name="i" :data="d"></DynamicTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var _ = require("lodash");
import DynamicTable from "DynamicTable.vue";

export default {
  name: "GenerateReport",
  components: {
    DynamicTable,
  },
  data: function () {
    return {
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
  },
  mounted() {},
};
</script>

<style>
</style>