import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        totalPrice:0
    },
    mutations:{
        increment(state,price){
            state.totalPrice += price
        },
        decrement(state,price){
            state.totalPrice -= price
        }
    },
    actions:{
        increase(context,price){
            context.commit('increment',price)
        },
        decrease(context,price){
            context.commit('decrement',price)
        }
    }
  })