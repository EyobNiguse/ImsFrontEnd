<template>
  <div id="chart">
    <apexchart height="500" :options="ChartOption" :series="Series"></apexchart>
  </div>
</template>

<script>
import apexchart from "vue-apexcharts";
var randomcolor = require("randomcolor");
export default {
  name: "ExpenceChart",
  components: {
    apexchart,
  },
  props: {
    Series: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    color() {
      return randomcolor({ count: this.Series.length });
    },
    ChartOption() {
      return {
        chart: {
          id: this.Series[0].name,
          type: "line",
          stacked: true,
          sparkline: {
            enabled: false,
          },
        },
        stroke: {
          width: [0,10],
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },

        fill: {
          opacity: 1,
        },
        legend: {
          position: "bottom",
          offsetY: 0,
          offsetX: 0,

          show: true,
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {},
        // colors: ["#008FFB"],
        //colors: ['#5564BE'],
        colors: randomcolor({
          count: this.Series.length,
          hue: "random",
        }),

        title: {
          text: this.Series[0].title,
          offsetX: 30,
          style: {
            fontSize: "24px",
            cssClass: "apexcharts-yaxis-title",
          },
        },
        subtitle: {
          text: this.Series[0].name,
          offsetX: 30,
          style: {
            fontSize: "14px",
            cssClass: "apexcharts-yaxis-title",
          },
        },
      };
    },
  },
};
</script>

<style>
</style>