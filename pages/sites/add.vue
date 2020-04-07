<template>
  <section class="section">
    <div class="container">
      <SiteForm
        pageTitle="Add site"
        btnText="Add"
        :fieldNameValue.sync="site.name"
        :fieldUrlValue.sync="site.url"
        @form-submit="add" />
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
      environmentId: this.$router,
      site: {
        name: '',
        url: ''
      }
    }
  },
  methods: {
    async add() {
      const response = await this.$axios.$post(
        `/sites`,
        {
          environment: `/environments/1`,
          name: this.site.name,
          url: this.site.url
        }
      );

      if (response) {
        this.$router.push('/');
      }
      console.log('r', response);
    }
  }
}
</script>
