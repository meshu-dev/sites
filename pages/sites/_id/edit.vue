<template>
  <section class="section">
    <div class="container">
      <SiteForm
        page-title="Edit site"
        btn-text="Save"
        :fieldNameValue.sync="site.name"
        :fieldUrlValue.sync="site.url"
        @form-submit="edit"
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
  async asyncData({ params, $axios, error }) {
    if (params.id) {
      const response = await $axios.get(`/sites/${params.id}`)

      return {
        site: response.data
      }
    }
  },
  data() {
    return {
      site: {
        id: 0,
        name: '',
        url: ''
      }
    }
  },
  methods: {
    async edit() {
      const response = await this.$axios.put(`/sites/${this.site.id}`, {
        name: this.site.name,
        url: this.site.url
      })

      const environmentId = this.site.environment.replace('/environments/', '')

      if (response) {
        this.$router.push(`/environments/${environmentId}/page/1`)
      }
    }
  }
}
</script>
