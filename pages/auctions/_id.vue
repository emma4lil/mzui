<template>
  <v-container>
    <div class="d-flex justify-center">
      <div class="text-h6 text-md-h3">
        Lowest Unique Bidder Wins!
        <p class="text-body-2">
          Some Instructions on how to bid for this product consectetur
          adipisicing elit. Corporis ratione rem accusantium, eaque doloribus
          voluptates! Rerum, qui laboriosam doloribus eligendi harum repellendus
          reprehenderit accusamus. Earum optio a unde ratione doloremque?
        </p>
      </div>
    </div>
    <v-row>
      <v-col cols="12">
        <v-card class="elevation-0">
          <!-- <v-card-title primary-title>
            <span>Auction</span>
          </v-card-title> -->

          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <v-img
                  class="white--text align-end"
                  height="400px"
                  :src="
                    'http://localhost:1337' + auction_data.product.cover.url
                  "
                >
                  <v-card-title>{{ auction_data.title }}</v-card-title>
                </v-img>
              </v-col>

              <v-col class="" cols="12" md="9">
                <div class="d-flex flex-column align-content-center">
                  <div class="text-h3">
                    {{ auction_data.product.name }}
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Enim officiis, aliquam iusto dicta laboriosam eum dolor,
                    odio accusamus ut veritatis recusandae ipsa quia deleniti
                    reprehenderit harum nulla architecto eius consectetur.
                  </p>

                  <template>
                    <div>
                      <no-ssr>
                        <flipCountdown
                          :deadline="auction_data.auction_information.expiry"
                        ></flipCountdown>
                      </no-ssr>
                    </div>
                  </template>

                  <v-spacer></v-spacer>

                  <div class="d-flex justify-center">
                    <v-form>
                      <v-text-field
                        name="bidAmount"
                        label="Enter Bidding Amount"
                        placeholder="Enter Bidding Amount!"
                        single-line
                      ></v-text-field>
                      <v-btn block color="primary" dark>submit</v-btn>
                    </v-form>
                  </div>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-card>
                  <v-card-title primary-title>
                    Latest 10 Bidders for this product
                  </v-card-title>
                  <v-card-text>
                    <div>
                      <v-sheet color="primary" class="mb-2 rounded-lg">
                        <div class="d-flex px-4">
                          <span class="ml-4">1.</span>
                          <span class="ml-4">Emma****lil</span>
                          <span class="ml-4">223.4</span>
                        </div>
                      </v-sheet>
                      <v-sheet color="primary" class="mb-2 rounded-lg">
                        <div class="d-flex px-4">
                          <span class="ml-4">2.</span>
                          <span class="ml-4">Josh****lil</span>
                          <span class="ml-4">23.4</span>
                        </div>
                      </v-sheet>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title primary-title>
            Latest Auctionable Products
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col
                v-for="(item, index) in auction_list"
                :key="index"
                cols="6"
                sm="3"
                md="3"
              >
                <Product :auction="true" :pro="item.product" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import flipCountdown from 'vue2-flip-countdown'
export default {
  components: {
    Product: () => import('../../components/Product'),
    flipCountdown,
  },
  data() {
    return {
      AUC_MOcK: {},
      auction_data: {
        auction_information: {
          expiry: '2020-12-31',
        },
        product: {
          cover: {
            url: '',
          },
        },
      },
      auction_list: [],
    }
  },

  created() {
    this.fetchAucDetails()
    this.fetchTopAuctions()
  },
  methods: {
    async fetchAucDetails() {
      const details = await this.$axios
        .$get(/auctions/ + this.$route.params.id)
        .catch((err) => {
          this.auction_data = err
        })

      this.auction_data = details
    },
    async fetchTopAuctions() {
      const list = await this.$axios.$get('/auctions').catch((err) => {
        this.auction_data = err
      })

      this.auction_list = list
    },
  },
}
</script>
