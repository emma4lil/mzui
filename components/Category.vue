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
        :src="api_url + cat.cover.url"
      >
        <v-card-text class="">
          <h2>{{ cat.name }}</h2>
        </v-card-text>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: ['cat', 'mode'],
  data() {
    return {
      api_url: process.env.baseUrl,
    }
  },
  methods: {
    goto(cat) {
      if (!this.mode) {
        this.$router.push('/catalogue/' + cat)
      } else {
        this.toProductListing()
        // Save to LS for most Visited
        if (process.client) {
          const visited = localStorage.getItem('most-visited')
          if (visited) {
            const visit = JSON.parse(visited)
            const d = visit.findIndex((el) => el.slug === this.cat.slug)
            if (d === -1) {
              visit.push({ name: this.cat.name, slug: this.cat.slug })
              localStorage.setItem('most-visited', JSON.stringify(visit))
            }
          } else {
            localStorage.setItem(
              'most-visited',
              JSON.stringify([{ name: this.cat.name, slug: this.cat.slug }])
            )
          }
        }
      }
    },
    toProductListing() {
      this.$router.push('/products/type/' + this.cat.tag)
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
