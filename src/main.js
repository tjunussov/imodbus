// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

// Global Functions
Vue.mixin({
  methods: {
    $resetData: function (emit) {
      console.log('reset global data =', this.$options.name)
      // reset data()
      Object.assign(this.$data, this.$options.data.call(this));
      if((emit !==null && emit) || ( emit == null)) this.$emit('reset',null) /// CAUTION! May Interefere with other local events
    },
    $_clone: function (val) {
      return Object.assign({},val);
    },
    $: function (id) {
      return document.querySelector(id)
    },
    $ArrayRemoveElement(arr,item){
      let index = arr.indexOf(item);
      if(index !== -1) {
        arr.splice(index, 1);
      }
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
