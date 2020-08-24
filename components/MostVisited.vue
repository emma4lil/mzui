<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="text-h6">
          10 most visited categories
        </div>
      </v-col>
      <v-col cols="12">
        <div class="d-flex flex-wrap">
          <v-chip
            v-for="(item, index) in visited"
            :key="index"
            color="primary"
            class="ma-1"
            @click="goto(item)"
            >{{ item.name }}</v-chip
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      visited: [{ name: 'root' }],
    }
  },
  created() {
    if (process.client) {
      const visited = JSON.parse(localStorage.getItem('most-visited'))
      if (visited) {
        this.visited = visited
      }
    }
  },
  methods: {
    goto(item) {
      this.$router.push('/products/type/' + item.slug)
    },
  },
}
</script>
