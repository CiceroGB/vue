import '@fortawesome/fontawesome-free/css/all.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';



import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import JsonCSV from 'vue-json-csv';

Vue.use(Vuetify);
Vue.component('downloadCsv', JsonCSV)

export default new Vuetify({
    icons: {
        iconfont: 'md' || 'fa'
    },
});
