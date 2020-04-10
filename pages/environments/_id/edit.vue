<template>
  <section class="section">
    <div class="container">
      <EnvironmentForm
        pageTitle="Edit environment"
        btnText="Save"
        :fieldValue.sync="environment.name"
        @form-submit="edit" />
    </div>
  </section>
</template>

<script>
import EnvironmentForm from '~/components/EnvironmentForm'

export default {
  components: {
    EnvironmentForm,
  },
  middleware: 'auth',
  data() {
    return {
      environment: {
        id: 0,
        name: ''
      }
    }
  },
  async asyncData({ params, $axios, error }) {
    if (params.id) {
      const response = await $axios.get(`/environments/${params.id}`);

      return {
        environment: response.data
      }
    }
  },
  methods: {
    async edit() {
      const response = await this.$axios.put(
        `/environments/${this.environment.id}`,
        {
          name: this.environment.name
        }
      );

      if (response) {
        this.$router.push(`/`);
      }

    }
  }
}
</script>
