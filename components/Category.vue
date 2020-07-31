<template>
  <v-hover v-slot:default="{ hover }" :name="cat.name">
    <v-card
      :elevation="hover ? 12 : 2"
      :class="{ 'on-hover': hover }"
      class="mx-auto rounded-xl"
      color=""
      max-width="500"
      @click="goto(cat.id)"
    >
      <v-img
        class="white--text justify-center align-end"
        :aspect-ratio="16 / 9"
        height="200px"
        :src="'http://localhost:1337' + cat.cover.url"
      >
        <v-card-text class="">
          <h2>{{ cat.name }}</h2>
          <h6>{{ mode }}</h6>
        </v-card-text>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ['cat', 'mode'],
  methods: {
    goto(cat) {
      if (!this.mode) {
        this.$router.push('/catalogue/' + cat)
      } else {
        this.toProductListing()
      }
    },
    toProductListing() {
      this.$router.push('/shop')
    },
  },
}
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
