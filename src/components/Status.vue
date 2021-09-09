<template>
  <div id="container">
    <form @submit.prevent="submitForm">
      <table>
        <tr>
          <td>
            <label for="">Starting Date</label>
            <input
              type="date"
              required
              v-model="post_data.date1"
              class="txt-input"
            />
          </td>
          <td>
            <label for=""> Ending Date</label>
            <input
              type="date"
              required
              v-model="post_data.date2"
              class="txt-input"
            />
          </td>
        </tr>
        <tr>
          <td>
            <select
              v-model="post_data.option"
              name="report"
              id="report"
              @change="onChange($event)"
              class="txt-input"
            >
              <option :key="i" v-for="i in report_type" :value="i">
                {{ i }}
              </option>
            </select>
          </td>
          <td>
            <span>Day {{ post_data.dayInterval }}</span
            ><input
              type="range"
              min="0"
              max="30"
              step="1"
              id="customRange3"
              v-model="post_data.dayInterval"
              class="txt-input"
            />
          </td>
        </tr>
        <tr>
          <td>
      <span> week {{ post_data.weekInterval }}</span
          ><input
            type="range"
            min="0"
            max="4"
            step="1"
            id="customRange3"
            v-model="post_data.weekInterval"
            class="txt-input"
          />
          </td>
          <td>
  
          <span>Month {{ post_data.monthInterval }}</span>
          <input
            type="range"
            class="txt-input"
            min="0"
            max="12"
            step="1"
            id="customRange3"
            v-model="post_data.monthInterval"
          />
          </td>
        </tr>
      </table>
      <input class="btn-submit" type="submit" value="Generate" />
    </form>
    <div id="spark-container">
    <div>
      <div>
        <div>
          <Sparkle
            :Series="generateSeries([{ name: 'Total-Purchase' }]).Series"
          ></Sparkle>
        </div>
      </div>
      <div>
        <div>
          <Sparkle
            :Series="generateSeries([{ name: 'Total-Sales' }]).Series"
          ></Sparkle>
        </div>
      </div>
    </div>
    <div >
      <div >
        <div >
          <Sparkle
            :Series="
              generateSeries([{ name: 'Gross-Profit', type: 'area' }]).Series
            "
          ></Sparkle>
        </div>
      </div>
      <div >
        <div>
          <Sparkle
            :Series="
              generateSeries([{ name: 'NET-Profit', type: 'area' }]).Series
            "
          ></Sparkle>
        </div>
      </div>
    </div>

    <div >
      <div >
        <div>
          <ExpenceChart
            :Series="
              generateSeries([
                { name: 'Rent-Expence', type: 'column' },
                { name: 'Other-Expences', type: 'column' },
                { name: 'Personal-Expences', type: 'column' },
                { name: 'Bill-Expences', type: 'column' },
                { name: 'Masatefiya-Expence', type: 'column' },
                { name: 'Sallary-Expence', type: 'column' },
                { name: 'LoadingUnloading-Expence', type: 'column' },
                { name: 'Tranfering-warehouse-store-Expence', type: 'column' },
                { name: 'Total-Expence', type: 'line' },
              ]).Series
            "
          ></ExpenceChart>
        </div>
      </div>
    </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import Sparkle from "@/components/Sparkle.vue";
import ExpenceChart from "@/components/ExpenceChart.vue";
<<<<<<< HEAD

=======
// import GenerateReportVue from './GenerateReport.vue';
// import GenerateReport from "@/api_calls/GenerateReport.js";
>>>>>>> 6aa67f9 (Prototype Done)
export default {
  name: "Staus",
  components: {
    Sparkle,
    ExpenceChart,
  },
  data() {
    return {
      report_type: ["fifo", "weighted"],
      data: [],
      post_data: {
        date1: "2021-08-01",
        date2: "2021-08-28",
        option: "fifo",
        dayInterval: 1,
        weekInterval: 0,
        monthInterval: 0,
        yearInterval: 0,
      },
      mapper: [
        "Total-Purchase",
        "Total-Sales",
        "Cost-Of-Sales",
        "Gross-Profit",
        "Rent-Expence",
        "Other-Expences",
        "Personal-Expences",
        "Bill-Expences",
        "Masatefiya-Expence",
        "LoadingUnloading-Expence",
        "Sallary-Expence",
        "Tranfering-warehouse-store-Expence",
        "Other-Incomes",
        "Bank-Deposit",
        "Bank-WithDrawl",
        "Purchases-CreditSettlement",
        "Sales-CreditSettlement",
        "Total-Expence",
        "NET-Profit",
      ],
    };
  },
  methods: {
    generateSeries(keys) {
      var Series = [];
      keys.forEach((element) => {
        var temp = Object.assign({}, this.calculated_data[element.name]);
        if ("type" in element) {
          temp["type"] = element.type;
        }
        Series.push(temp);
      });
      return { Series };
    },
    onChange() {
      var e = document.getElementById("report");
      this.post_data.option = e.value;
    },
    async submitForm() {
      var data = JSON.stringify(this.post_data);

      var config = {
        method: "post",
        url: "/api/report/get_report_interval",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = axios(config);
      response
        .then((result) => {
          this.data = result.data;
          this.updateChart();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateChart() {
      this.series = [
        {
          name: "Gross-Profit",
          data: this.data.map((d) => {
            return [d.Date, d.report["Gross-Profit"]];
          }),
        },
      ];
    },
  },
  computed: {
    test() {
      return this.generateSeries(["Gross-Profit", "NET-Profit"]);
    },
    calculated_data() {
      var result = {};
      this.mapper.forEach((y) => {
        var tempVal = 0;
        var tempData = this.data.map((d) => {
          return [d.Date, d.report[y]];
        });
        if (tempData.length > 1) {
          tempVal = tempData.splice(-1)[0][1];
        }
        result[y] = {
          name: y,
          data: tempData,
          title: tempVal,
        };
      });
      return result;
    },
    Gross_Profit() {
      var tempVal = 0;

      var tempData = this.data.map((d) => {
        return [d.Date, d.report["Gross-Profit"]];
      });
      if (tempData.length > 1) {
        tempVal = tempData.splice(-1)[0][1];
      }
      return {
        subtitle: "Gross-Profit",
        data: tempData,
        title: tempVal,
      };
    },
  },
};
</script>
<style >
  #spark-container{
    display: grid;
    grid-template-columns:33% 33% 33%;
    grid-template-rows:100px;
    grid-gap:20px;
  }
</style>
