<template lang="pug">
  b-card(no-body :class="{isTransmitting}" @click="trigger")
    b-card-header {{no}} {{mode}} {{timer.time}}
      i.fa.fa-compass.ml-1(v-if="enableDemo")/ 
    b-card-body {{regs}}
    b-card-footer
      code {{bus}}
</template>

<script>

import Vue from 'vue'

export default {
  name: 'Device',
  props: ['no','bus'],
  watch:{
    bus(val){
      this.isTransmitting = Boolean(val)
    },
    enableDemo(val){
      if(val) this.demo();
      else this.undemo();
    },
    regs(){
      this.emit(this.regs);
    }
  },
  computed:{
    mode(){
      return this.isSlave?'Slave':'Master'
    }
  },
  data () {
    return {
      isSlave:true,
      isTransmitting:false,
      enableDemo:false,
      regs:[0,0,0,0,0],
      timer:{time:null,interval:null},
    }
  },
  created(){
    if(this.no == 1) this.enableDemo = true;
  },
  beforeDestroy(){
    this.undemo();
  },
  methods:{
    demo(){
      this.timer.time = Math.floor(Math.random()*10+1);
      this.timer.interval = window.setTimeout(()=>{
        this.trigger();
        this.demo();
      },this.timer.time*1000)
    },
    undemo(){
      window.clearTimeout(this.timer.interval);  
    },
    trigger(){
      var l = Math.floor(Math.random() * this.regs.length);
      Vue.set(this.regs,l,this.regs[l]==1?0:1);
    },
    readHoldingRegisters(startReg,length){
      this.emit(this.regs);
    },
    writeHoldingRegisters(reg,val){
      this.regs[reg] = val;
    },
    emit(val){
      if(this.bus == null){
        this.sendToBus(val);
      } else {

      }
    },
    sendToBus(val){
      this.$emit('setBus',`1:W:${this.no}:${val}`);
    },
  }
}
</script>

<style scoped lang="stylus">
.device
  border 1px solid #ccc
  
.isTransmitting
  border-color #f00

</style>
