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