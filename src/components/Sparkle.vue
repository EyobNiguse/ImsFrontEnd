<template>
  <apexchart width="100%" :options="options" :series="Series"></apexchart>
</template>
<script>
import apexchart from "vue-apexcharts";
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
        fill: {
          opacity: 1,
          colors: ["#008FFB", "#5564BE", "#9C27B0"],
        },
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
        colors: ["#008FFB", "#5564BE", "#9C27B0"],

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