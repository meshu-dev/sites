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
        name: ''
      },
      doc: 'dddd'
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
      console.log('edit', this.environment.name);
      return;

      const response = await $axios.put(
        `/environments/${environment.id}`,
        {}
      );
    }
  }
}
</script>

<style scoped>
  input {
    max-width: 300px;
  }
</style>
