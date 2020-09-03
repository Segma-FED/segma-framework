import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import plugins from './plugins';

Vue.config.productionTip = false;
Vue.use(plugins);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


if (window.parent !== window) {
    const target = window.parent || window.opener;
    setInterval(() => {
        target.postMessage(
            {
                pathname: window.location.pathname
            },
            '*'
        );
    }, 1000);
}
