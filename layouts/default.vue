<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  middleware: ['auth', 'verify-token'],
  components: {
    Navbar
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
section {
  margin-top: 5vh;
}
.btn {
  max-height: 40px;
}
.btn-primary,
.btn-primary:hover {
  background-color: #0c7470;
  border-color: #0c7470;
}
.page-item.active .page-link {
  background-color: #0c7470;
  border-color: #0c7470;
}
.page-link {
  color: #0c7470;
}
a,
a:hover {
  color: #0c7470;
}
</style>
