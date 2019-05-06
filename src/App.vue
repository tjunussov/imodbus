<template lang="pug">
doctype html

#app

  b-navbar(toggleable="md" fixed="top" type="dark" variant="dark")

    b-nav-toggle(target="nav_collapse")

    b-navbar-brand(to="/")
      img.mr-2(src="./assets/logo.png" height="28")
      | iMODBUS

  b-container
    b-card-group.main(deck)
      device(:no="c" :key="c" :bus="bus" v-for="c in count" @setBus="setBus")

</template>

<script>

import Device from '@/components/Device'

export default {
  name: 'app',
  data(){
    return {
      count:5,
      bus:null,
      interval:null,
      tm:null
    }
  },
  created(){
    
  },
  beforeDestroy(){
    
  },
  methods:{
    setBus(v){
      window.clearTimeout(this.tm)
      this.bus = v;
      window.setTimeout(()=>{this.bus = null},1000)
    }
  },
  components:{Device}
}
</script>

<style lang="stylus">

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

body
  padding-top 3.5rem
  
.card
  flex 0 0 auto !important
  margin-left 0 !important
  width 11rem
  
  .card-footer 
    height 3rem

</style>
