<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <Menu :data="catalogue" />
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title style="width: 350px;">
        <a href="/" class="white--text" style="text-decoration: none;"
          ><v-icon>mdi-truck</v-icon>&nbsp;Omizar</a
        >
      </v-toolbar-title>

      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down pl-10 ml-4"
      />
      <v-spacer />
      <span v-if="$auth.user">{{ $auth.user.email }}</span>
      <span v-else>guest</span>
      <v-btn to="/login" icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn icon v-on="on">
        <v-badge content="2" value="2" color="green" overlap>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-btn href="/cart" icon v-on="on">
        <v-badge content="2" value="2" color="green" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <!-- Right Navigator -->

    <v-main app>
      <v-bottom-navigation :value="activeBtn" color="primary" horizontal>
        <v-btn href="/">
          <span>Home</span>
        </v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn to="/catalogue" v-on="on">
              <span>Catalogue</span>
            </v-btn>
            <v-btn to="/products" v-on="on">
              <span>Shop</span>
            </v-btn>
          </template>
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :href="'/shop/' + item.tag"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-card>
        </v-menu>

        <v-btn to="/blog">
          <span>Blog</span>
        </v-btn>
      </v-bottom-navigation>
      <router-view />
    </v-main>
    <v-footer :padless="true">
      <v-card flat tile width="100%" class="secondary white--text text-center">
        <v-card-text>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-home</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-email</v-icon>
          </v-btn>
          <v-btn class="mx-4 white--text" icon>
            <v-icon size="24px">mdi-calendar</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          assumenda libero reiciendis quaerat quos! Dicta dolor rerum assumenda
          explicabo cumque eum commodi id totam sint, saepe voluptate similique
          quibusdam error.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Omizar</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import { mapState } from 'vuex'
export default {
  fetchOnServer: true,
  components: {
    // Menu: () => import('../components/pip/MegaMenu'),
  },
  created() {
    this.$store.dispatch('catalogue/getCatalogue')
    this.$store.dispatch('catalogue/getCategories')
    this.$store.dispatch('products/fetchAllProducts')
    this.$store.dispatch('context/getUserProfile')
  },
  computed: {
    ...mapState({
      catalogue: (state) => state.catalogue,
    }),
  },
  data() {
    return {
      d: 'hello',
      drawer: false,
      items: [
        { title: 'T-Shirts', tag: 'slug' },
        { title: 'Jackets', tag: 'slug' },
        { title: 'Shirts', tag: 'slug' },
        { title: 'Jeans', tag: 'slug' },
        { title: 'Shoes', tag: 'slug' },
      ],
      activeBtn: 1,
    }
  },
}
</script>
