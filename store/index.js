export const state = () => ({
  vendor_id: null,
  activeMenu: null,
});

export const mutations = {
  setVendorId(state, payload) {
    state.vendor_id = payload;
  },
  setActiveMenu(state, payload) {
    state.activeMenu = payload;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch, commit }) {
    await this.$axios.$get('/api/user')
      .then(res => {
        commit('auth/SET', { key: 'user', value: res.data });
        commit('auth/SET', { key: 'loggedIn', value: true });
      })
      .catch(err => {
        return '/signin';
      })
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
  }
};