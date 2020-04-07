<template>
  <section class="section">
    <div class="container">
      <div class="d-flex justify-content-between">
        <h1 class="title">Sites</h1>
        <b-button
          type="submit"
          variant="primary"
          @click="showAddSitePage">
          Add Site
        </b-button>
      </div>
      <b-table
        show-empty
        striped
        hover
        :items="items"
        :fields="fields">
        <template v-slot:cell(url)="data">
          <a
            :href="data.item.url"
            target="_blank"
            rel="noopener noreferrer">
            {{ data.item.url }}
          </a>
        </template>
        <template v-slot:cell(actions)="row">
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
        hide-footer>
        <p class="my-4">
          Are you you want to delete the {{ deleteItem.name }} site?
        </p>
        <div class="d-flex justify-content-center">
          <b-button @click="deleteSite" class="danger">
            Delete
          </b-button>
        </div>
      </b-modal>
    </div>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      items: [],
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'url', label: 'Url' },
        { key: 'actions', label: 'Actions' }
      ],
      deleteItem: {
        id: 0,
        name: ''
      }
    }
  },
  async asyncData({ params, $axios, error }) {
    if (params.id) {
      const response = await $axios.get(`/environments/${params.id}`);
      
      let sites = response.data.sites,
          data = { items: [] };

      for (let site of sites) {
        data.items.push({
          id: site['id'],
          name: site['name'],
          url: site['url']
        });
      }

      return data;
    }
  },
  methods: {
    async getSiteItems() {
      const response = await this.$axios.get(
        `/environments/${this.$route.params.id}`
      );

      let sites = response.data.sites,
          data = [];

      for (let site of sites) {
        data.push({
          id: site['id'],
          name: site['name'],
          url: site['url']
        });
      }
      return data;
    },
    showAddSitePage() {
      this.$router.push(
        `/environments/${this.$route.params.id}/sites/add`
      );
    },
    showEditPage(item) {
      this.$router.push(`/sites/${item.id}/edit`);
    },
    showDeletePopup(item) {
      this.deleteItem = item;
      this.$refs['delete-popup'].show();
    },
    async deleteSite() {
      const response = await this.$axios.$delete(
        `sites/${this.deleteItem.id}`
      );
      this.$refs['delete-popup'].hide();

      let items = await this.getSiteItems();
      this.items = items;
    }
  }
}
</script>
