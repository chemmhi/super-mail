<template>
  <swiper class="details-swiper">
    <swiper-item v-for='item in topImage'>
      <img :src="item" alt="" @load="detailsSwiperEnd">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper-other'
export default {
  name: "DetailsSwiper",
  data(){
    return {
      endLoadImageCount:0
    }
  },
  props:{
    topImage:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem,
  },
  methods:{
    detailsSwiperEnd(){
      if (++this.endLoadImageCount===this.topImage.length) this.emitter.emit('imgEndLoad')
    }
  }
}
</script>

<style scoped>
  .details-swiper {
    width: 100%;
    height: 18rem;
  }
</style>
