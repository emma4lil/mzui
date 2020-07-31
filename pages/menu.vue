<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="(item, index) in catalogues" :key="index" cols="12">
          {{ item }}
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-expansion-panel expand focusable> </v-expansion-panel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import catalogueQuery from '../apollo/queries/category/catalogue'
export default {
  data() {
    return {}
  },
  apollo: {
    catalogues: {
      prefetch: true,
      query: catalogueQuery,
    },
  },
}
</script>
