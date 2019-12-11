export default {
    namespaced: true,
    state: {
        carts: [],
        totalPrice: ''
    },
    mutations: {
        addToCart(state, payload) {
            state.carts.push(payload)
        },
        addNumber(state, payload) {
            payload.number++
        }
    },
    actions: {
        addCart({
            commit,
            state
        }, payload) {
            let isadd = state.carts.find(item => item.id === payload.id)
            if (isadd) {
                commit('addNumber', isadd)
            } else {
                let obj = {
                    id: payload.id,
                    name: payload.name,
                    price: payload.price,
                    number: 1
                }
                commit('addToCart', obj)
            }
            //调用product里面的mutation方法
            commit('product/depNumber', payload, {
                root: true
            })
        }
    },
    getters: {
        total(state) {
            return state.carts.reduce((total, item) => {
                return total += item.price * item.number

            }, 0)
        }
    }
}