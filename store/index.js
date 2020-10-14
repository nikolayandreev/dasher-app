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
  async nuxtServerInit({ dispatch }) {
    // await dispatch('setUser');
  },

  commitVendorId({ commit }, payload) {
    commit('setVendorId', payload);
  },
  commitActiveMenu({ commit }, payload) {
    commit('setActiveMenu', payload);
  }
  // setUser({ state, commit }) {
  //     if (state.auth.loggedIn) {
  //         this.$axios.$get('/api/user').then(res => {
  //             this.$auth.setUser(res);
  //         }).catch(err => {
  //             console.error(err);
  //             this.$auth.logout();
  //         })
  //     }
  // }
};

export const getters = {
  getVendorId(state) {
    return state.vendor_id;
  },
  getActiveMenu(state) {
    return state.activeMenu;
  }
};