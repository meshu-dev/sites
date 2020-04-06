<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Nuxt Auth</h1>
      <b-table
        show-empty
        striped
        hover
        :items="items"
        :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button>
            View Sites
          </b-button>
          <b-button @click="info(row.item, row.index, $event.target)">
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
          Are you you want to delete the {{ deleteItem.name }} environment?
        </p>
        <div class="d-flex justify-content-center">
          <b-button @click="deleteEnvironment" class="danger">
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
        { key: 'name', label: 'Environment' },
        { key: 'actions', label: 'Actions' }
      ],
      deleteItem: {
        id: 0,
        name: ''
      }
    }
  },
  async asyncData({ $axios, error }) {
    const response = await $axios.get('/environments');
    let environments = response.data['hydra:member'],
        data = { items: [] };

    for (let environment of environments) {
      data.items.push({
        id: environment['id'],
        name: environment['name']
      });
    }

    console.log('environments', environments);

    return data;
  },
  methods: {
    info(item, index, button) {
      console.log('item', item, index, button);
    },
    showDeletePopup(item) {
      this.deleteItem = item;
      this.$refs['delete-popup'].show();
    },
    deleteEnvironment() {
      console.log('deleteEnvironment');
    }
  }
}
</script>

<style>
.links {
  padding-top: 15px;
}
</style>
