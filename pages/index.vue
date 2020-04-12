<template>
  <section class="section">
    <div class="container">
      <div class="d-flex justify-content-between">
        <h1 class="title">Environments</h1>
        <b-button
          type="submit"
          variant="primary"
          @click="showAddEnvironmentPage"
        >
          Add Environment
        </b-button>
      </div>
      <b-table show-empty striped hover :items="items" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button @click="showEnvPage(row.item)">
            View Sites
          </b-button>
          <b-button @click="showEditPage(row.item)">
            Edit
          </b-button>
          <b-button @click="showDeletePopup(row.item)">
            Delete
          </b-button>
        </template>
      </b-table>
      <div v-show="!items">No environments available</div>
      <b-modal
        id="delete-popup"
        ref="delete-popup"
        title="Confirm delete"
        hide-footer
      >
        <p class="my-4">
          Are you you want to delete the {{ deleteItem.name }} environment?
        </p>
        <div class="d-flex justify-content-center">
          <b-button class="danger" @click="deleteEnvironment">
            Delete
          </b-button>
        </div>
      </b-modal>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ $axios, error }) {
    const response = await $axios.get('/environments')
    const environments = response.data['hydra:member']
    const data = { items: [] }

    for (const environment of environments) {
      data.items.push({
        id: environment.id,
        name: environment.name,
        siteCount: environment.sites.length
      })
    }

    return data
  },
  data() {
    return {
      items: [],
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'siteCount', label: 'Site count' },
        { key: 'actions', label: 'Actions' }
      ],
      deleteItem: {
        id: 0,
        name: ''
      }
    }
  },
  methods: {
    async getEnvironmentItems() {
      const response = await this.$axios.get(`/environments`)
      const environments = response.data['hydra:member']
      const data = []

      for (const environment of environments) {
        data.push({
          id: environment.id,
          name: environment.name,
          siteCount: environment.sites.length
        })
      }
      return data
    },
    showAddEnvironmentPage() {
      this.$router.push(`/environments/add`)
    },
    showEnvPage(item) {
      this.$router.push(`/environments/${item.id}`)
    },
    showEditPage(item) {
      this.$router.push(`/environments/${item.id}/edit`)
    },
    showDeletePopup(item) {
      this.deleteItem = item
      this.$refs['delete-popup'].show()
    },
    async deleteEnvironment() {
      await this.$axios.$delete(`environments/${this.deleteItem.id}`)
      this.$refs['delete-popup'].hide()
      this.items = await this.getEnvironmentItems()
    }
  }
}
</script>

<style>
.links {
  padding-top: 15px;
}
</style>
