import axiosBase from '../../axios';
import axios from 'axios';

export default ({
  namespaced: true,
  state: {
    packages: [],
    page: 1,
    searchBy: 'null',
    searchByGh: false,
  },
  mutations: {
    setPackages(state, data) {
      state.packages = data;
    },
    setCurrentPage(state, payload) {
      state.page = payload;
    },
    prevPage(state) {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
    nextPage(state) {
      state.page += 1;
    },
    changeSearchRules(state, { value }) {
      state.searchByGh = value;
    }
  },
  actions: {
    async fetchPackages({ commit, getters }) {
      const currentPage = getters.getCurrentPage;
      try {
        const { data } = await axiosBase.get(`/stats/packages?limit=10&page=${currentPage}`);
        commit('setPackages', data);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async searchByNpm({ commit }, payload) {
      console.log(payload);
      try {
        const res = await axios.get(`https://api.npms.io/v2/package/${payload}`);
        const data = [
          {
            type: 'npm',
            name: res.data.collected.metadata.name
          }
        ];
        commit('setPackages', data);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async searchByGh({ commit }, payload) {
      try {
        const res = await axios.get(`https://api.github.com/repos/${payload}`);
        const data = [
          {
            type: 'npm',
            name: res.data.full_name
          }
        ];
        commit('setPackages', data);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
  getters: {
    getPackages(state) {
      return state.packages;
    },
    getCurrentPage(state) {
      return state.page;
    },
    isSearchingByGh(state) {
      return state.searchByGh;
    }
  }
});