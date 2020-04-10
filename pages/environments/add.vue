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
      const response = await this.$axios.$post(
        `/environments`,
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
