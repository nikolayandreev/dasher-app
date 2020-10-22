export const state = () => ({
  address: null,
  name: null,
  worktime: null,
});

export const mutations = {
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