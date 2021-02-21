<template>
  <div class="modal" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div v-if="data">
          <div class="modal-header">
            <h5
              v-if="isGhPackage"
              class="modal-title"
            >
              {{ data.full_name }}
            </h5>
            <h5
              v-else
              class="modal-title"
            >
              {{ data.collected.metadata.name }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="onClose"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div
            v-if="isGhPackage"
            class="modal-body"
          >
            <p>{{ data.description }}</p>
            <p>
              <a
                v-if="data.html_url"
                :href="data.html_url"
                target="_blank"
              >
                Github link
              </a>
            </p>
          </div>
          <div
            v-else
            class="modal-body"
          >
            <p>{{ data.collected.metadata.description }}</p>
            <p>
              <a
                v-if="data.collected.github.homepage"
                :href="data.collected.github.homepage"
                target="_blank"
              >
                Homepage link
              </a>
            </p>
            <p>
              <a
                v-if="data.collected.metadata.links.repository"
                :href="data.collected.metadata.links.repository"
                target="_blank"
              >
                Github repository
              </a>
            </p>
            <p>Last version {{ data.collected.metadata.version }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="onClose"
            >
              Close
            </button>
          </div>
        </div>
        <Preloader v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Modal',
  props: {
    data: Object,
    packageInfo: Object
  },
  components: {
    Preloader: () => import('@/components/Preloader')
  },
  methods: {
    ...mapActions('modal', [
      'fetchNpmPackageData',
      'fetchGhPackageData',
    ]),
    onClose() {
      this.$emit('onClose');
    }
  },
  computed: {
    ...mapGetters('modal', [
      'isGhPackage',
    ])
  },
  created() {
    if (this.isGhPackage) {
      this.fetchGhPackageData();
    } else {
      this.fetchNpmPackageData();
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  display: block;
  background-color: rgba(0, 0, 0, .3);
}
</style>