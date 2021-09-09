<template>
  <apexchart width="100%" :options="options" :series="Series"></apexchart>
</template>
<script>
import apexchart from "vue-apexcharts";
var randomcolor = require("randomcolor");
export default {
  name: "Sparkle",
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
  computed: {
    options() {
      return {
        chart: {
          id: this.Series[0].name,
          type: "area",
          stacked: true,
          height: 400,
          sparkline: {
            enabled: false,
          },
        },
        stroke: {
          curve: "straight",
        },
        fill: { colors: ["#008FFB"] },
        legend: {
          position: "top",
          offsetY: -100,
          offsetX: 180,

          show: true,
        },
        xaxis: {
          type: "datetime",
        },

        yaxis: {},
        // colors: ["#008FFB"],
        //colors: ['#5564BE'],
        colors: randomcolor({
          count: 1,
          hue: "green",
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