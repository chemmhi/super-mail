<template>
  <div v-if="Object.keys(detailsInfo).length!==0" class="details-goods-list">
    <div class="goods-desc">
      <div class="top-line"></div>
      <p class="goods-desc">{{goodsDesc}}</p>
      <div class="bottom-line"></div>
    </div>
    <div class="details-goods-list">
      <div class="key-desc">
<!--        <div class="line-of-key"></div>-->
        <div class="key">{{detailsInfo.detailImage[0].key}}</div>
<!--        <div class="line-of-key"></div>-->
      </div>
      <div v-for="item in goodsList">
        <img :src="item" alt="" @load="detailsGoodListEndLoad">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "DetailsGoodsList",
  props:{
    detailsInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    getGoodsList(){
      if(this.detailsInfo.desc)  this.goodsDesc=this.detailsInfo.desc;
      if(this.detailsInfo.detailImage[0].list.length!==0) this.goodsList=this.detailsInfo.detailImage[0].list;
      if(this.detailsInfo.detailImage[0].key) this.key=this.detailsInfo.detailImage[0].key;
    },
    detailsGoodListEndLoad(){
      this.emitter.emit('imgEndLoad')
    }
  },
  data(){
    return {
      goodsDesc:'',
      goodsList:[],
      key:'',
    }
  },
  updated() {
    this.getGoodsList()
  }

}
</script>

<style scoped>
  .details-goods-list {
    margin-top: 2rem;
  }
  .details-goods-list img {
    width:100%;
  }
  .goods-desc {
    font-size: .8rem;
    margin: .8rem .6rem .8rem .6rem;
    position: relative;
    text-align: center;
    line-height: 1.8rem;
  }
  .top-line {
    height: 1px;
    width: 6rem;
    background-color: #333;
  }
  .bottom-line {
    height: 1px;
    width: 6rem;
    background-color: #333;
    position: absolute;
    right:.2rem;
  }
  .key-desc {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4rem;
    padding-top: 1rem;
    margin: 2rem .6rem .3rem .3rem;
    border-top: 1px solid rgba(200,200,200,.8);
  }
  .line-of-key {
    height: 1px;
    background-color: #8f8f8f;
    flex: 1;
  }
  .key {
    width: 6rem;
    text-align: center;
    font-size: .8rem;
    padding: 0 .3rem 0 .3rem;
  }
  .details-back-to-top {
    position: fixed;
  }
</style>
