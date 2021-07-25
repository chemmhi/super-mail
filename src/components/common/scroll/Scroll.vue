<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BetterScroll from "better-scroll";

  export default {
    name: "Scroll",
    data(){
      return {
        scroll: null,
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0,
      },
      pullUpLoad:{
        type:Boolean,
        default:false,
      }

    },
    methods:{
      scrollTo(x,y,time=500){
        this.scroll.scrollTo(x,y,time)
      },

    },
    mounted() {
      this.scroll = new BetterScroll(this.$refs.wrapper,{
        pullUpLoad: this.pullUpLoad,
        probeType:this.probeType,
        observeDOM: true,
        click: true,
      })
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullUpEnd')
        this.scroll.finishPullUp()
      })
    }
  }
</script>

<style scoped>

</style>
