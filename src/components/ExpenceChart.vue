<template>
  <div id="chart">
    <apexchart height="500" :options="ChartOption" :series="Series"></apexchart>
  </div>
</template>

<script>
import apexchart from "vue-apexcharts";
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
    return {
      // series: [
      // {
      //   name: "PRODUCT A",
      //   data: [44, 55, 41, 67, 22, 43],
      // },
      // {
      //   name: "PRODUCT B",
      //   data: [13, 23, 20, 8, 13, 27],
      // },
      // {
      //   name: "PRODUCT C",
      //   data: [11, 17, 15, 15, 21, 14],
      // },
      // {
      //   name: "PRODUCT D",
      //   data: [21, 7, 25, 13, 22, 8],
      // },
      // ],
    };
  },
  computed: {
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
          width: [0, 4],
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