import api from "../service/api";
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const state = {
    lists: []
}

const actions = {
    async getLists({ commit }) {
        await api.get('').then(res => { commit('SET_LISTS', res.data) })
    }
}

const mutations = {
    SET_LISTS(state, lists) {
        lists = lists.filter((item) => item.D3C !== "Mês (Código)");
        let i = 0;
        lists = lists.map((obj) => ({ ...obj, subId: i++ }));
        state.lists = lists
    }
}

const getters = {
    allLists: (state) => state.lists
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})
