export const state = () => ({
  steps: [
    { step: 1, status: 'pending' },
    { step: 2, status: 'pending' },
    { step: 3, status: 'pending' },
    { step: 4, status: 'pending' },
  ],
  address: null,
  name: null,
  worktime: null,
});

export const mutations = {
  setStep(state, payload) {
    const step = state.steps.find(item => item.step === payload.step)
    step.status = payload.status;
  },
  setAddress(state, payload) {
    state.address = payload;
  },
  setName(state, payload) {
    state.name = payload;
  },
  setWorktime(state, payload) {
    state.worktime = payload;
  }
};

export const actions = {
  commitStep({ commit }, payload) {
    commit('setStep', payload);
  },
  commitAddress({ commit }, payload) {
    commit('setAddress', payload);
  },
  commitName({ commit }, payload) {
    commit('setName', payload);
  },
  commitWorktime({ commit }, payload) {
    commit('setWorktime', payload);
  },
};

export const getters = {
  getStep(state) {
    return state.steps;
  },
  getAddress(state) {
    return state.address;
  },
  getName(state) {
    return state.name;
  },
  getWorktime(state) {
    return state.worktime;
  }
};