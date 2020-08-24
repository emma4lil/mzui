import { mapState } from 'vuex';
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
        <Filter />

        <v-row dense>
          <v-col cols="12" sm="8" class="pl-6 pt-6">
            <small>Showing 1-12 of {{ products.length }} products</small>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="select"
              class="pa-0"
              :items="options"
              style="margin-bottom: -20px;"
              outlined
              dense
            ></v-select>
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-row>
          <v-col v-for="pro in products" :key="pro.id" cols="6" md="3">
            <ProductCard :pro="pro" />
          </v-col>
        </v-row>
        <!-- <div class="text-center mt-12">
          <v-pagination v-model="page" :length="6"></v-pagination>
        </div> -->
      </v-col>
    </v-row>
  </v-container>
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
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
  },
  components: {
    ProductCard: () => import('../../components/Product'),
    Filter: () => import('../../components/Productfilter'),
  },
}
</script>
