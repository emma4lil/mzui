<template>
  <div class="class">
    <template>
      <v-treeview :items="data"></v-treeview>
    </template>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data: () => ({}),
}
</script>
