import {
    getMock
} from '@/api'
export default {
    namespaced: true,
    state: {
        product: []
    },
    mutations: {
        setProduct(state, payload) {
            state.product = payload
        },
        depNumber(state, payload) {
            let depItem = state.product.find(item =>
                item.id === payload.id
            )

            if (depItem.number) {
                depItem.number--
            } else {
                alert('没有库存了')
            }
        }
    },
    actions: {
        async getProduct({
            commit
        }) {
            const res = await getMock()
            if (res) {
                commit('setProduct', res.list)
            }

        }
    },
    getters: {}
}