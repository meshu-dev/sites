<template>
  <b-form method="post" @submit.prevent="submit">
    <h1>{{ pageTitle }}</h1>
    <b-form-group label-for="name-field" label-cols="2" label="Name:">
      <b-form-input
        id="name-field"
        v-model="fieldValue"
        type="text"
        required
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">
      {{ btnText }}
    </b-button>
  </b-form>
</template>

<script>
export default {
  props: {
    pageTitle: String,
    btnText: String
  },
  computed: {
    fieldValue: {
      get() {
        return this.$attrs.fieldValue
      },
      set(val) {
        this.$emit('update:fieldValue', val)
      }
    }
  },
  methods: {
    submit() {
      this.$emit('form-submit')
    }
  }
}
</script>

<style scoped>
input {
  max-width: 300px;
}
</style>
