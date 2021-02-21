import axios from 'axios';

export default ({
  namespaced: true,
  state: {
    showed: false,
    data: null,
    packageInfo: null,
  },
  mutations: {
    openModal(state, payload) {
      state.packageInfo = payload;
      state.showed = true;
    },
    closeModal(state) {
      state.showed = false;
      state.data = null;
    },
    setData(state, data) {
      state.data = data;
    }
  },
  actions: {
    async fetchNpmPackageData({ commit, getters }) {
      const packageInfo = getters.getPackageInfo;
      try {
        const { data } = await axios.get(`https://api.npms.io/v2/package/${packageInfo.name}`);
        commit('setData', data);
      } catch (error) {
        console.log(error);
        alert('Error :(');
        commit('closeModal');
        return error;
      }
    },
    async fetchGhPackageData({ commit, getters }) {
      const packageInfo = getters.getPackageInfo;
      try {
        const { data } = await axios.get(`https://api.github.com/repos/${packageInfo.name}`);
        commit('setData', data);
      } catch (error) {
        console.log(error);
        alert('Error :(');
        commit('closeModal');
        return error;
      }
    }
  },
  getters: {
    isShowed(state) {
      return state.showed;
    },
    getData(state) {
      return state.data;
    },
    getPackageInfo(state) {
      return state.packageInfo;
    },
    isGhPackage(state) {
      return state.packageInfo.name.split('/').length > 1;
    }
  }
});