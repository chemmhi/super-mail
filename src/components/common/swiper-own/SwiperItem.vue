<template>
  <swiper>
    <template #item id="item">
      <slot name="content"></slot>
    </template>
    <template #point id="point">
      <slot name="content-point"></slot>
    </template>
    <template #btn>
      <button class="btn" id="goPre" @click="goPre">&lt</button>
      <button class="btn" id="goNext" @click="goNext">&gt</button>
    </template>
  </swiper>

</template>

<script>
  import Swiper from "components/common/swiper-own/Swiper";

  export default {
    name: "SwiperItem",
    components:{
      Swiper,
    },
    props:{
      banner:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        index:0,
        // banner:["a","b","c","d","e"]
      }
    },
    created(){
      setInterval(()=>{
        this.goNext()
      },2000)
    },
    methods:{
      goPre(){
        if(this.index>0){
          this.index--
        }else{
          this.index=this.banner.length-1
        }
      },
      goNext(){
        if(this.index===this.banner.length-1){
          this.index=0;
        }else{
          this.index++
        }
      },
      pointClick(index){
         this.index=index
      },
    }
  }
</script>

<style scoped>
  #item:nth-child(all) {
    width:100%;
    height:100%;
    position: absolute;
    opacity: 0;
    transition: all .5s;
    background-color: black;
  }

  .item.active {
    opacity: 1;
    z-index: 10;
  }

  .point {
      width:20px;
      height:20px;
      background-color: rgba(0,0,0,.4);
      border-radius: 100%;
      border:2px solid rgba(255,255,255,.8);
      cursor: pointer;
  }
  .point.active{
    background-color: rgba(255,255,255,0.6);
  }
  .btn {
    width:60px;
    height:100px;
    font-size: 50px;
    position: absolute;
    top:150px;
    opacity: 0.5;
    cursor:pointer;
    z-index: 100;
  }
  #goPre {
    left:0
  }
  #goNext {
    right:0;
  }
</style>
