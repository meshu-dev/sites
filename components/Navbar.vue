<template>
  <div id="navbar-container">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">DevAdmin</b-navbar-brand>
      <b-navbar-nav class="ml-auto" v-show="isLoggedIn">
        <b-nav-item href="javascript:void(0);" @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<style>
#navbar-container,
.bg-info {
  background-color: #0C7470 !important;
}
.navbar {
  max-width: 1000px;
  margin: 0 auto;
}
</style>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/login');
    }
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn
    }
  }
}
</script>
