<template>
  <div class="row">
    <h1>{{ Name }}</h1>
    <div class="col">
      <table class="table table-hover">
        <thead class="thead bg-primary text-light">
          <tr>
            <th v-for="k in columns" :key="k" scope="col">{{ k }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(d, i) in data" :key="i">
            <td v-for="row in d" :key="row">
              <button :hidden="!Array.isArray(row)">
                More
              </button>
              {{ Array.isArray(row) ? "" : row }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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

<style>
</style>