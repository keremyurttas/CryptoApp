<template>
  <div class="">
    <Pie
      :data="{
        labels: chartDetails.names,
        datasets: [
          { backgroundColor: backgroundColor, data: chartDetails.data },
        ],
      }"
      :options="options"
    ></Pie>
  </div>
</template>
<script setup>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { defineProps } from "vue";
ChartJS.register(ArcElement, Tooltip, Legend);

defineProps({
  chartDetails: {
    default() {
      return {
        names: [],
        data: [],
      };
    },
  },
});

const backgroundColor = [
  "#E78570",
  "#CCD6FB",
  "#6C8FB5",
  "#614847",
  "#FDA369",
  "#FDD6B6",
  "#D14734",
  "#AD8897",
  "#5B3A57",
  "#473B06",
  "#B6685B",
  "#DD9F0B",
  "#7DD6EA",
  "#E1F8FF",
];

const options = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
