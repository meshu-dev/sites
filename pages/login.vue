<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="d-flex justify-content-center align-items-center">
          <b-form method="post" @submit.prevent="login">
            <h1>Login</h1>
            <b-form-group
              label-for="email-field">
              <b-form-input
                id="email-field"
                v-model="email"
                type="email"
                required
                placeholder="Enter email address"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-for="password-field">
              <b-form-input
                id="password-field"
                v-model="password"
                 type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>
            <div class="d-flex justify-content-center">
              <b-button
                type="submit"
                variant="primary">
                Submit
              </b-button>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .container {
    height: 80vh;
  }
  .columns,
  .d-flex {
    height: inherit;
  }
  h1 {
    text-align: center;
    font-size: 1.5em;
  }
</style>

<script>
import Notification from '~/components/Notification'

export default {
  components: {
    Notification
  },
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        });
        this.$router.push('/');
      } catch (e) {
        console.log('ERROR', e);
        this.error = e.response.data.message
      }
    }
  }
}
</script>