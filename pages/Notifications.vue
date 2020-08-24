<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-center text-h2">
          Notifications
        </div>
      </v-col>
      <v-col>
        <v-card
          v-for="(item, index) in notifications"
          :key="index"
          class="my-2"
        >
          <v-card-title primary-title>
            <span class="mr-2">{{ index + 1 }} </span> {{ item.header }}
          </v-card-title>
          <v-card-text>
            {{ item.markdown }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="">delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      notifications: [
        {
          header: 'Order #345334 is ready for Shipping',
          time: '2020-04-31',
          markdown: 'the quick brown fox jumps over the lazy dog',
          textdown: 'lorem ipsum varna dolo coro valumn igor pusum',
          seen: false,
        },
        {
          header: 'Order #345334 is ready for Shipping',
          time: '2020-04-31',
          markdown: 'the quick brown fox jumps over the lazy dog',
          textdown: 'lorem ipsum varna dolo coro valumn igor pusum',
          seen: true,
        },
        {
          header: 'You have just recieved the order ',
          time: '2020-04-31',
          markdown: 'the quick brown fox jumps over the lazy dog',
          textdown: 'lorem ipsum varna dolo coro valumn igor pusum',
          seen: false,
        },
      ],
    }
  },
}
</script>
