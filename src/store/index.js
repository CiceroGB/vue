import api from "../service/api";
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const state = {
    lists: [],
    dates: []
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

        let date = lists.reduce((prev, current) => {
            const x = prev.find((item) => item.D3C === current.D3C);
            if (!x) {
                return prev.concat([current]);
            } else {
                return prev;
            }
        }, []);
        date = date.sort((a, b) => parseFloat(b.D3C) - parseFloat(a.D3C));


        date = date.map((item) => item.D3N);

        state.dates = date


    },


}

const getters = {
    allLists: (state) => state.lists,
    allDates: (state) => state.dates
}

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})
