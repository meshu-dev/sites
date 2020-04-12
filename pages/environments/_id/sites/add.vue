<template>
  <section class="section">
    <div class="container">
      <SiteForm
        page-title="Add site"
        btn-text="Add"
        :fieldNameValue.sync="site.name"
        :fieldUrlValue.sync="site.url"
        @form-submit="add"
      />
    </div>
  </section>
</template>

<script>
import SiteForm from '~/components/SiteForm'

export default {
  components: {
    SiteForm
  },
  middleware: 'auth',
  data() {
    return {
      site: {
        name: '',
        url: ''
      }
    }
  },
  methods: {
    async add() {
      const response = await this.$axios.$post(`/sites`, {
        environment: `/environments/${this.$route.params.id}`,
        name: this.site.name,
        url: this.site.url
      })

      if (response) {
        this.$router.push(`/environments/${this.$route.params.id}`)
      }
    }
  }
}
</script>
