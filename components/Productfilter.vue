<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
        filter
      </v-btn>
    </template>
    <v-container>
      <v-card>
        <v-card-title primary-title>
          Filter
        </v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex at,
          consequuntur voluptas ea, non nesciunt labore earum facere commodi
          quidem esse hic, amet atque deleniti ab quam mollitia doloribus qui.
        </v-card-text>
      </v-card>
    </v-container>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      filter_type_A: {
        attribs: {
          price: {
            type: 'decimal',
            control: 'range',
            min: 0,
            max: 100000,
          },
        },
      },
    }
  },
}
</script>
