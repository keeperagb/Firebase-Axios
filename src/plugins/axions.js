import Vue from "vue";
import axios from "axios";


axios.defaults.baseURL = 'https://app1-37890-default-rtdb.firebaseio.com/'

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios
    }
})