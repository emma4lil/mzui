/* eslint-disable prettier/prettier */
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="5">
          <v-img
            style="height: 510px; width: 100%;"
            src="https://picsum.photos/510/300?random"
            aspect-ratio="1.7"
          ></v-img>
        </v-col>
        <!-- col -->
        <v-col class="px-4" cols="12" md="7">
          <v-row class="justify-space-between">
            <v-col cols="12">
              <h6 class="text-caption">Pay In Bits.</h6>
              <h1 class="text-sm-h3 mb-2">{{ item.name }}</h1>
              <h2 class="px-1 text-subtitle-1">
                Minimum Pay
                <span>&#8358;{{ item.minFactor }}</span>
              </h2>
              <h5 class="px-1 text-subtitle-1">{{ item.description }}</h5>
            </v-col>

            <v-col>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quaerat tempora eveniet illo minus temporibus. Placeat alias
                aperiam pariatur deleniti similique eos odio iusto quod repellat
                facere, excepturi aspernatur, libero non?
              </p>
            </v-col>

            <v-col>
              // eslint-disable-next-line prettier/prettier
              <v-progress-circular
                :value="100"
                color="primary"
              ></v-progress-circular>
            </v-col>

            <v-col cols="12">
              <div>
                <v-text-field
                  class="ml-2"
                  width="200"
                  label="Amount"
                  placeholder="How much do you have?."
                  solo
                ></v-text-field>
                <v-btn block color="primary">pay</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <row>
        <v-col cols="12">
          <h2>Payment History</h2>
          <v-divider />
          <div>
            <template>
              <div v-for="(record, index) in mock_fromUser" :key="index">
                <v-sheet class="my-2 px-2">
                  <v-row>
                    <v-col>
                      <span>{{ index + 1 }}</span>
                      <span class="mx-2">{{ record.date }}</span>
                      <span>{{ record.productID }}</span>
                      <span>{{ record.provider }}</span>
                      <span>{{ record.amount }}</span>
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
    }
  },
}
</script>
