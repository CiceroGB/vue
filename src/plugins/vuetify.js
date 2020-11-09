import '@fortawesome/fontawesome-free/css/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import JsonCSV from 'vue-json-csv';
import VueApexCharts from 'vue-apexcharts'

Vue.use(Vuetify);
import pt from '../locale/pt'

Vue.use(VueApexCharts)
Vue.component('downloadCsv', JsonCSV)
Vue.component('apexchart', VueApexCharts)

Vue.component('v-data-table', {
    methods: {
        changeLocale() {
            this.$vuetify.lang.current = 'pt'
        },
    },
})

export default new Vuetify({
    icons: {
        iconfont: 'md' || 'fa'
    },
    lang: {
        locales: { pt },
        current: 'pt',
    },
});
