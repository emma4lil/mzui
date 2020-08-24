import { mapState } from 'vuex';
<template>
  <div>
    <v-container>
      <div class="d-flex flex-column align-center">
        <div class="text-h3 text-md-2 my-4">{{ name }}</div>
        <div style="mx-auto">
          <p class="text-center mb-12">
            Browse through our 300+ product categories and sub categories and
            use our filters to see what’s trending.
          </p>
        </div>
      </div>
      <!-- Fequent categories -->
      <Visited />

      <v-row v-if="true">
        <v-col
          v-for="category in categories"
          :key="category.id"
          cols="3"
          sm="3"
          md="3"
        >
          <CatCard :mode="routeToShop" :cat="category" />
        </v-col>
      </v-row>
    </v-container>
    <v-btn color="pink" dark absolute bottom right fab>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  components: {
    CatCard: () => import('../../components/Category'),
    Visited: () => import('../../components/MostVisited'),
  },
  data() {
    return {
      categories: [],
      routeToShop: true,
      name: '',
      mostVisited: [],
    }
  },
  watch: {
    deep: true,
    '$route.params.id': {
      handler(id) {
        this.fetchCategory(id)
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  methods: {
    async fetchCategory(id) {
      const data = await this.$axios.$get('/catalogues/' + id)
      this.categories = data.categories
      this.name = data.name
    },
  },
}
</script>
