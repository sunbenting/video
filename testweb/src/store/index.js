import Vue from 'vue'
import Vuex from 'vuex'
// import cart from './models/cart'
// import product from './models/product'
Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    state: {
        test: 'test'
    },
    mutations: {},
    actions: {},
    modules: {
        // cart,
        // product
    }
})