export const state = () => ({
  steps: [
    { step: 1, status: 'pending' },
    { step: 2, status: 'pending' },
    { step: 3, status: 'pending' },
    { step: 4, status: 'pending' },
    { step: 5, status: 'pending' },
  ],
  areas: null,
  vendor_id: null,
  address_id: null,
});

export const mutations = {
  setStep(state, payload) {
    const step = state.steps.find(item => item.step === payload.step)
    step.status = payload.status;
  },
  setAreas(state, payload) {
    state.areas = payload;
  },
  setVendorId(state, payload) {
    state.vendor_id = payload;
  },
  setAddressId(state, payload) {
    state.address_id = payload;
  }
};

export const actions = {
  commitStep({ commit }, payload) {
    commit('setStep', payload);
  },
  commitAreas({ commit }, payload) {
    commit('setAreas', payload);
  },
  commitVendorId({ commit }, payload) {
    commit('setVendorId', payload);
  },
  commitAddressId({ commit }, payload) {
    commit('setAddressId', payload)
  }
};

export const getters = {
  getStep(state) {
    return state.steps;
  },
  getAreas(state) {
    return state.areas;
  },
  getVendorId(state) {
    return state.vendor_id;
  },
  getAddressId(state) {
    return state.address_id;
  }
};