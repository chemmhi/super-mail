<template>
  <div id="details">
    <details-nav-bar class="details-nav"/>
    <scroll class="content" ref="detailsScroll" :probe-type="3" @scroll="scroll">
      <details-swiper :top-image="topImage" @detailsSwiperEnd="detailsSwiperEnd"/>
      <details-goods :goods="goods" />
      <details-shop-info :shop="shop" />
      <details-goods-list :details-info="detailsInfo" @detailsGoodListEndLoad="detailsSwiperEnd"/>
    </scroll>
    <back-to-top @click="detailsBackToTop" v-show="showDetailsBackToTop" />
  </div>
</template>

<script>
  import DetailsNavBar from "@/views/details/children-component/DetailsNavBar";
  import DetailsSwiper from "@/views/details/children-component/DetailsSwiper";
  import DetailsGoods from "@/views/details/children-component/DetailsGoods";
  import DetailsShopInfo from "@/views/details/children-component/DetailsShopInfo";
  import DetailsGoodsList from "@/views/details/children-component/DetailsGoodsList";

  import Scroll from "@/components/common/scroll/Scroll";
  import BackToTop from "@/components/content/back-to-top/BackToTop";

  import {getDetails, GoodsDetails, Shop} from "@/network/details";
  import GoodsList from "@/components/content/goods/GoodsList";

  export default {
    name: "Details",
    data(){
      return {
        iid: this.$route.query.iid,
        topImage: null,
        goods:{},
        shop:{},
        detailsInfo:{},
        showDetailsBackToTop:false,
        itemParams:{},
      }
    },
    components:{
      GoodsList,
      DetailsNavBar,
      DetailsSwiper,
      DetailsGoods,
      DetailsShopInfo,
      DetailsGoodsList,

      Scroll,
      BackToTop
    },
    created(){
      this.getDetailsContent(this.iid)
    },
    methods:{
      getDetailsContent(iid){
        getDetails(iid).then((res)=>{
          const data=res.result
          this.topImage=data.itemInfo.topImages
          this.goods = new GoodsDetails(data.itemInfo,data.columns,data.shopInfo.services)
          this.shop = new Shop(data.shopInfo);
          this.detailsInfo= data.detailInfo
          this.itemParams=data.itemParams
        })
      },

      detailsSwiperEnd(){
        this.$refs.detailsScroll.refresh()
      },

      detailsBackToTop(){
        this.$refs.detailsScroll.scrollTo(0,0,500)
      },

      scroll(position){
        this.showDetailsBackToTop = -position.y>1000
      }
    }
  }
</script>

<style scoped>
 #details {
   position: relative;
   z-index: 101;
   background-color: var(--color-background);
   /*height: 100vh;*/
 }
 .details-nav {
   position: relative;
   z-index: 12;
 }
 .content{
   height: calc(100vh - 44px);
   /*height: 100vh;*/
   overflow-y: hidden;

 }
</style>
