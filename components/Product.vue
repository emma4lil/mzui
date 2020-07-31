<template>
  <v-card
    class="mx-auto rounded-lg elevation-0"
    color="transparent"
    max-width="400px"
    @click="goto"
  >
    <v-img
      class="text--dark align-end rounded-lg"
      :aspect-ratio="16 / 9"
      height="300px"
      :src="'http://localhost:1337' + pro.cover.url"
    >
      <template v-if="auction">
        <div class="d-flex justify-end">
          <h4 class="text-caption mx-4 red--text">AUCTION</h4>
        </div>
      </template>
    </v-img>
    <v-card-text class="text--primary">
      <div class="text-h5">
        {{ pro.name }}
      </div>
      <div class="text-subtitle-1">&#8358;{{ pro.priceInfo.newprice }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['pro', 'auction'],
  methods: {
    goto() {
      this.$router.push('/products/' + this.pro.id)
    },
  },
}
</script>

<style></style>
