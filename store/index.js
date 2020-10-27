export const state = () => ({
  vendor_id: null,
  selectedVendor: null,
  activeMenu: null,
});

export const mutations = {
  setVendorId(state, payload) {
    state.vendor_id = payload;
  },
  setActiveMenu(state, payload) {
    state.activeMenu = payload;
  },
  setSelectedVendor(state, payload) {
    state.selectedVendor = payload;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch, commit }) {
    await dispatch('fetchInitialData')
  },
  async fetchInitialData({ dispatch }) {
    await dispatch('fetchUser');
  },
  async fetchUser({ commit }) {
    await this.$axios.$get('/sanctum/csrf-cookie').then(res => {
      this.$axios.$get('/api/user')
        .then(res => {
          commit('auth/SET', { key: 'user', value: res.data });
          commit('auth/SET', { key: 'loggedIn', value: true });
        })
        .catch(err => {
          commit('auth/SET', { key: 'loggedIn', value: false });
        })
    })
  },
  commitVendor({ commit }, payload) {
    commit('setSelectedVendor', payload);
  },
  commitVendorId({ commit }, payload) {
    commit('setVendorId', payload);
  },
  commitActiveMenu({ commit }, payload) {
    commit('setActiveMenu', payload);
  },
};

export const getters = {
  getVendorId(state) {
    return state.vendor_id;
  },
  getActiveMenu(state) {
    return state.activeMenu;
  },
  getSelectedVendor(state) {
    return state.selectedVendor;
  }
};