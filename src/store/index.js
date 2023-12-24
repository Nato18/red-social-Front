import { createStore } from 'vuex'
export default createStore({
  state: {
    // Tu estado inicial aquí
    token: null,
    userInfo: null,
  },
  mutations: {
    setToken(state,token){
        state.token = token;
    },
    setUserInfo(state,userInfo){
        state.userInfo = userInfo;
    }
  },
  actions: {
    // Tus acciones aquí
  },
  modules: {
    // Tus módulos aquí
  },
});