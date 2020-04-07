<template>
  <section class="section">
    <div class="container">
      <EnvironmentForm
        pageTitle="Add environment"
        btnText="Add"
        :fieldValue.sync="environment.name"
        @form-submit="add" />
    </div>
  </section>
</template>

<script>
import EnvironmentForm from '~/components/EnvironmentForm'

export default {
  middleware: 'auth',
  components: {
    EnvironmentForm,
  },
  middleware: 'auth',
  data() {
    return {
      environment: {
        name: ''
      }
    }
  },
  methods: {
    async add() {
      console.log('add', this.environment.name);
      return;

      const response = await $axios.post(
        `/environments`,
        {}
      );
    }
  }
}
</script>
