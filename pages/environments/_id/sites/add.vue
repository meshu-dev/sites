<template>
  <section class="section">
    <div class="container">
      <SiteForm
        page-title="Add site"
        btn-text="Add"
        :field-name-value.sync="site.name"
        :field-url-value.sync="site.url"
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
        this.$router.push(`/environments/${this.$route.params.id}/page/1`)
      }
    }
  }
}
</script>
