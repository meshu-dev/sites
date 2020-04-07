<template>
  <section class="section">
    <div class="container">
      <EnvironmentForm
        pageTitle="Edit site"
        btnText="Save"
        :fieldValue.sync="site.name"
        @form-submit="edit" />
    </div>
  </section>
</template>

<script>
import SiteForm from '~/components/SiteForm'

export default {
  middleware: 'auth',
  components: {
    SiteForm,
  },
  middleware: 'auth',
  data() {
    return {
      site: {
        name: ''
      }
    }
  },
  async asyncData({ params, $axios, error }) {
    if (params.id) {
      const response = await $axios.get(`/sites/${params.id}`);

      return {
        site: response.data
      }
    }
  },
  methods: {
    async edit() {
      console.log('edit', this.site.name);
      return;

      const response = await $axios.put(
        `/sites/${site.id}`,
        {}
      );
    }
  }
}
</script>
