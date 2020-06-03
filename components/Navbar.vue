<template>
  <div id="navbar-container">
    <b-navbar toggleable="lg" type="dark" variant="info" class="container">
      <b-navbar-brand to="/">DevAdmin</b-navbar-brand>
      <b-navbar-nav v-show="isLoggedIn" class="ml-auto">
        <b-nav-item href="javascript:void(0);" @click="showEnvironments"
          >Environments</b-nav-item
        >
        <b-nav-item href="javascript:void(0);" @click="logout"
          >Logout</b-nav-item
        >
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<style>
#navbar-container,
.bg-info {
  background-color: #0c7470 !important;
}
</style>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn
    }
  },
  methods: {
    showEnvironments() {
      this.$router.push('/')
    },
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>
