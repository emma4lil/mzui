<template>
  <div>
    <v-container>
      <div class="d-flex flex-column align-center">
        <div class="text-h3 text-md-2 my-4">Browse Our Catalogue</div>
        <div style="mx-auto">
          <p class="text-center mb-12">
            Browse through our 300+ product categories and sub categories and
            use our filters to see what’s trending.
          </p>
        </div>
      </div>

      <Visited />

      <v-row>
        <v-col
          v-for="category in catalogue"
          :key="category.id"
          cols="6"
          sm="6"
          md="3"
        >
          <CategoryCard :cat="category" @click="gotoChild" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
<script>
import { mapState } from 'vuex'
import categoriesQuery from '../../apollo/queries/category/categories'
export default {
  data: () => ({
    range: [0, 10000],
    select: 'Popularity',
    options: [
      'Default',
      'Popularity',
      'Relevance',
      'Price: Low to High',
      'Price: High to Low',
    ],
    page: 1,
    breadcrums: [
      {
        text: 'Home',
        disabled: false,
        href: 'breadcrumbs_home',
      },
      {
        text: 'Clothing',
        disabled: false,
        href: 'breadcrumbs_clothing',
      },
      {
        text: 'T-Shirts',
        disabled: true,
        href: 'breadcrumbs_shirts',
      },
    ],
    min: 0,
    max: 10000,
    items: [
      {
        id: 2,
        name: 'Shoes',
        children: [
          { id: 2, name: 'Casuals' },
          { id: 3, name: 'Formals' },
          { id: 4, name: 'Sneakers' },
        ],
      },
      {
        id: 1,
        name: 'Clothing',
        children: [
          { id: 5, name: 'Shirts' },
          { id: 6, name: 'Tops' },
          { id: 7, name: 'Tunics' },
          { id: 8, name: 'Bodysuit' },
        ],
      },
    ],
  }),
  apollo: {
    categories: {
      prefetch: true,
      query: categoriesQuery,
    },
  },
  computed: {
    ...mapState({
      catalogue: (state) => state.catalogue.catalogue,
    }),
  },
  components: {
    CategoryCard: () => import('../../components/Category'),
    Visited: () => import('../../components/MostVisited'),
  },
  methods: {
    gotoChild() {
      alert('hi')
      this.router.push('/catalogue/high')
    },
  },
}
</script>
