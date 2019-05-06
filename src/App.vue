<template lang="pug">
doctype html

#app

  b-navbar(toggleable="md" fixed="top" type="dark" variant="dark")

    b-nav-toggle(target="nav_collapse")

    b-navbar-brand(to="/")
      img.mr-2(src="./assets/logo.png" height="28")
      | iMODBUS

  b-container
    b-row.mb-4
      b-col
        b-card.main(header="0 Main Master")
          code {{regs}}
    b-row.mb-4
      b-col
        b-card
          code {{bus}}
    b-row
      b-col
        b-card-group.slaves(deck)
          device(:no="c" :key="c" :bus="bus" v-for="c in count" @tx="tx")
    

</template>

<script>

import Device from '@/components/Device'
import Master from '@/components/Master'

export default {
  name: 'app',
  data(){
    return {
      count:5,
      bus:null,
      interval:null,
      tm:null,
      regs:{}
    }
  },
  created(){
    
  },
  beforeDestroy(){
    
  },
  methods:{
    tx(v,callback){
      window.clearTimeout(this.tm)
      this.bus = v;
      this.syncBus();
      window.setTimeout(()=>{this.bus = null;callback()},100)
    },
    syncBus(){
      if(this.bus){
        var m = this.bus.split(":");
        this.regs[m[2]] = m[0];
      }
    }
  },
  components:{Device,Master}
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
  min-height 4.5rem
  
.main.card
  background-color #ffc
  
  
.slaves .card
  // flex 0 0 auto !important
  // width 12rem
  // margin 0 1rem 1rem 0 !important
  position relative
  cursor pointer
  background-color transparent !important
  transition  background 0.2s ease-out, color 0.2s ease-out, border-color 0.5s ease-out !important
    
  
  .card-footer 
    height 3rem

</style>
