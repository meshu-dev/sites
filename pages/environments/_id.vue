<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Environment</h1>
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
  async asyncData({ params, $axios, error }) {
    if (params.id) {
      const response = await $axios.get(`/environments/${params.id}`);
      let sites = response.data.sites;

      //console.log('response', response.data.sites);
    }

    /*
    let environments = response.data['hydra:member'],
        data = { items: [] };

    for (let environment of environments) {
      data.items.push({
        id: environment['id'],
        name: environment['name']
      });
    }

    console.log('environments', environments);

    return data; */
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
