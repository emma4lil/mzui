/* eslint-disable prettier/prettier */
<template :key="loading">
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <v-img
            style="height: 510px; width: 100%;"
            :src="$API_URL + product.cover.url"
            aspect-ratio="1.7"
          ></v-img>
        </v-col>
        <!-- col -->
        <v-col class="px-4" cols="12" md="7">
          <v-row class="justify-space-between">
            <v-col cols="12">
              <h6 class="text-caption">Pay In Bits.</h6>
              <h1 class="text-sm-h3 mb-2">{{ product.name }}</h1>
              <div class="text-h5">&#8358;{{ product.price.newprice }}</div>
              <h2 class="px-1 text-subtitle-1">
                Minimum Pay
                <span>&#8358;{{ product.pay_in_bit.pibMeta.min_amount }}</span>
              </h2>
              <h5 class="px-1 text-subtitle-1">{{ item.description }}</h5>
            </v-col>

            <v-col> </v-col>

            <v-col cols="12">
              <div v-if="user.bits_registras[0].status === 'undefined'">
                {{ user.bits_registras[0].status }}
              </div>
              <v-progress-linear
                :value="progress"
                color="primary"
                height="25"
                striped
                rounded
              >
                <template v-slot="">
                  <strong>{{ Math.floor(progress) }}%</strong>
                </template>
              </v-progress-linear>
            </v-col>

            <v-col v-if="remain <= 0" cols="12">
              <v-card>
                <v-card-title primary-title>
                  Pay In Bits Completed for this Product.
                </v-card-title>
                <v-card-text>
                  Congratulations! you can now add this product to your cart.
                </v-card-text>
                <v-card-actions>
                  <v-btn block color="primary" dark>add to cart</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12">
              <div v-if="!remain <= 0">
                <v-card class="my-2">
                  <v-card-text>
                    <div class="mb-2">
                      <span class="text-h6">Wallet Balance: </span
                      ><span class="text-h6 green--text">
                        &#8358;{{ user.wallet.balance }}</span
                      >
                    </div>
                    <v-text-field
                      v-model="amount"
                      width="200"
                      placeholder="How much do you have?."
                      outlined
                      class="mb-0"
                      type="number"
                    ></v-text-field>
                    <div class="my-0">
                      You have
                      <span class="blue--text">{{ remain }}</span> remaining to
                      purchase this product.
                    </div>
                    <div v-if="excedded" class="orange--text">
                      <div>
                        Warning!
                      </div>
                      Insufficient wallet balance or You are making excess
                      payments. Do you wish to TopUp your wallet?
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      v-if="!excedded"
                      :disabled="loading"
                      :loading="loading"
                      width="200"
                      color="primary"
                      @click="pay"
                      >pay</v-btn
                    >

                    <template v-slot:loader>
                      <span>paying...</span>
                    </template>
                    <v-spacer></v-spacer>
                    <v-btn v-if="excedded" width="200" color="green"
                      >top up</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <row>
        <v-col v-if="product.pay_in_bit.pib_records.length > 0" cols="12">
          <h2>Payment History</h2>
          <v-divider />
          <div>
            <template>
              <div
                v-for="(record, index) in product.pay_in_bit.pib_records"
                :key="index"
              >
                <v-sheet class="my-2 px-2">
                  <v-row>
                    <v-col>
                      <span>{{ index + 1 }}</span>
                      <span class="mx-2">{{ record.name }}</span>
                      <span>&#8358;{{ record.paid_amount }}</span>
                      <!-- <span>{{ record.provider }}</span> -->
                      <!-- <span>{{ record.amount }}</span> -->
                    </v-col>
                  </v-row>
                </v-sheet>
              </div>
            </template>
          </div>
        </v-col>
      </row>
    </v-container>
  </div>
</template>

<script>
import userData from '../../apollo/queries/userData.gql'
import productPIBR from '../../apollo/queries/productPIBR'
export default {
  data() {
    return {
      item: {
        id: 'uid-xajds',
        name: 'Nokia PureView 2020',
        holdDuration: 120,
        minFactor: 1000,
        description: `This product can be held down for 60 days.`,
        total: '100400',
      },
      mock_fromUser: [
        {
          amount: 2000,
          date: '2019-20-3',
          provider: 'FlutterWave',
          payID: 'FLW-2020-xxx-xxxx',
          productID: 'PD-MKD-12003',
        },
        {
          amount: '2500',
          date: '2019-20-3',
          provider: 'FlutterWave',
          payID: 'FLW-2020-xxx-xxxx',
          productID: 'PD-SDK-34534',
        },
      ],
      loading: false,
      m: 'rat',
      amount: 0,
      pibID: '',
    }
  },
  apollo: {
    product: {
      query: productPIBR,
      variables() {
        return {
          product_id: this.$route.params.id,
        }
      },
    },
    user: {
      query: userData,
      variables() {
        return {
          id: this.$auth.user.id,
          pib_id: this.pibID,
        }
      },
    },
  },
  computed: {
    totalPaid() {
      return this.product.pay_in_bit.pib_records.reduce(
        (acc, p) => p.paid_amount + acc,
        0
      )
    },
    progress() {
      return (this.totalPaid / this.product.price.newprice) * 100
    },
    remain() {
      const r = this.product.price.newprice - this.totalPaid
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.amount = r
      // lazy hack should be refactored
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.pibID = this.product.pay_in_bit.id
      return r
    },
    excedded() {
      return (
        +this.amount > +this.remain || +this.amount > +this.user.wallet.balance
      )
    },
  },
  methods: {
    async postBid() {
      const payload = {
        name: this.$auth.user.email,
        paid_amount: this.amount,
        pay_in_bit: this.product.pay_in_bit.id,
        user: this.$auth.user.id,
      }
      await this.$axios.post('/bits-records', payload).then((res) => {
        this.loading = false
        // window.location.reload()
      })
    },
    async pay() {
      const payload = {
        amount: this.amount,
        pib_id: this.product.pay_in_bit.id,
      }

      this.loading = true
      await this.$axios
        .post('/wallets/pay', payload)
        .then((res) => {
          this.loading = false
          // window.location.reload()
          this.m = res.data.balance
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
