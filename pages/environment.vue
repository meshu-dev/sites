<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Nuxt Auth</h1>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      items: []
    }
  },
  methods: {
    info(item, index, button) {
      console.log('item', item, index, button);
    }
  }
}
</script>

<style scoped>
</style>
