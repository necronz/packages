<template>
  <div id="app">
    <header class="header pt-4 pb-4 bg-light">
      <div class="container d-flex">
        <div class="field-block">
          <b-form-input
            class="field-block__input"
            v-model="searchText"
            :placeholder="getSearchPlacehlder"
          />
          <div class="field-block__toggle">
            <toggle-button
              color="#007bff"
              @change="changeSearchRules($event)"
            />
          </div>
        </div>
        <b-button
          variant="primary"
          class="ml-2"
          @click="onSearch"
        >
          Search
        </b-button>
      </div>
    </header>
    <div class="container">
      <Table
        :data="getPackages"
        :currentPage="getCurrentPage"
        @onRowClick="openModal($event)"
        @onPrev="prevPageHandler"
        @onNext="nextPageHandler"
      />
    </div>
    <Modal
      v-if="isShowed"
      :data="getData"
      :packageInfo="getPackageInfo"
      @onClose="closeModal"
    />
    <footer class="footer">
      by Alexander Krylovsky - <a href="https://github.com/necronz" target="_blank">Github</a>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    Table: () => import('@/components/Table'),
    Modal: () => import('@/components/Modal')
  },
  data: () => ({
    searchText: '',
  }),
  methods: {
    ...mapActions('table', [
      'fetchPackages',
      'searchByNpm',
      'searchByGh',
    ]),
    ...mapMutations('table', [
      'setCurrentPage',
      'prevPage',
      'nextPage',
      'changeSearchRules',
    ]),
    ...mapMutations('modal', [
      'openModal',
      'closeModal',
    ]),
    prevPageHandler() {
      this.prevPage();
      this.fetchPackages(this.getCurrentPage);
    },
    nextPageHandler() {
      this.nextPage();
      this.fetchPackages(this.getCurrentPage);
    },
    onSearch() {
      if (this.searchText) {
        if (this.isSearchingByGh) {
          this.searchByGh(this.searchText);
        } else {
          this.searchByNpm(this.searchText);
        }
        this.searchText = '';
        this.setCurrentPage(1);
      } else {
        this.fetchPackages();
      }
    }
  },
  computed: {
    ...mapGetters('table', [
      'getPackages',
      'getCurrentPage',
      'isSearchingByGh',
    ]),
    ...mapGetters('modal', [
      'isShowed',
      'getData',
      'getPackageInfo'
    ]),
    getSearchPlacehlder() {
      return this.isSearchingByGh ? 'Search by Github (user/repo)...' : 'Search by NPM (package name)...';
    }
  },
  async created() {
    this.fetchPackages();
  }
}
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
.footer {
  margin-top: auto;
  padding: 10px 0;
}
.field-block {
  position: relative;
  width: 100%;

  &__toggle {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-11px);
  }
}
</style>
