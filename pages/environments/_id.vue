<template>
  <section class="section">
    <div class="container">
      <div class="d-flex justify-content-between">
        <h1 class="title">Environment</h1>
        <b-button
          type="submit"
          variant="primary"
          @click="showAddSitePage">
          Add Site
        </b-button>
      </div>
      <div v-show="sites.length === 0">No sites added</div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      sites: []
    }
  },
  async asyncData({ params, $axios, error }) {
    if (params.id) {
      const response = await $axios.get(`/environments/${params.id}`);
      let sites = response.data.sites;

      return {
        //environmentId: params.id,
        sites: sites
      };
    }
  },
  methods: {
    showAddSitePage() {
      this.$router.push(`/sites/add`);

      this.$router.push({
        path: `/sites/add`,
        params: {
          environmentId: this.$route.query.id
        }
      });
    }
  }
}
</script>
