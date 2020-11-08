import '@fortawesome/fontawesome-free/css/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import JsonCSV from 'vue-json-csv';
import VueApexCharts from 'vue-apexcharts'

Vue.use(Vuetify);
Vue.use(VueApexCharts)
Vue.component('downloadCsv', JsonCSV)
Vue.component('apexchart', VueApexCharts)

export default new Vuetify({
    icons: {
        iconfont: 'md' || 'fa'
    },
});
