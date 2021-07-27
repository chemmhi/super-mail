<template>
  <swiper class="details-swiper">
    <swiper-item v-for='item in topImage'>
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper-other'
export default {
  name: "DetailsSwiper",
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
  }
}
</script>

<style scoped>
  .details-swiper {
    width: 100%;
    height: 18rem;
  }
</style>
