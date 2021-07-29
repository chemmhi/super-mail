<template>
  <div id="details">
    <details-nav-bar class="details-nav" @centerItemClick="centerItemClick" ref="detailsNavBar"/>
    <scroll class="content" ref="detailsScroll" :probe-type="3" @scroll="scroll">
      <details-swiper :top-image="topImage" @detailsSwiperEnd="detailsSwiperEnd"/>
      <details-goods :goods="goods" />
      <details-shop-info :shop="shop" />
      <details-goods-list :details-info="detailsInfo" @detailsGoodListEndLoad="detailsSwiperEnd"/>
      <details-item-params :item-params="itemParams" ref="detailsItemParams"/>
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
  import DetailsItemParams from "@/views/details/children-component/DetailsItemParams";

  import Scroll from "@/components/common/scroll/Scroll";
  import BackToTop from "@/components/content/back-to-top/BackToTop";

  import {getDetails, GoodsDetails, Shop, ItemParams} from "@/network/details";
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
        currentItem:null,
      }
    },
    components:{
      GoodsList,
      DetailsNavBar,
      DetailsSwiper,
      DetailsGoods,
      DetailsShopInfo,
      DetailsGoodsList,
      DetailsItemParams,

      Scroll,
      BackToTop
    },
    created(){
      this.getDetailsContent(this.iid)
    },
    methods:{
      /*网络请求,请求详情页的所有数据*/
      getDetailsContent(iid){
        getDetails(iid).then((res)=>{
          const data=res.result
          this.topImage=data.itemInfo.topImages
          this.goods = new GoodsDetails(data.itemInfo,data.columns,data.shopInfo.services)
          this.shop = new Shop(data.shopInfo);
          this.detailsInfo= data.detailInfo
          this.itemParams = new ItemParams(data.itemParams)
        })
      },

      /*监听图片加载完成后进行刷新*/
      detailsSwiperEnd(){
        this.$refs.detailsScroll.refresh()
      },
      /*回到顶部点击事件*/
      detailsBackToTop(){
        this.$refs.detailsScroll.scrollTo(0,0,500)
      },
      /*监听scroll组件内部的点击事件*/
      scroll(position){
        this.showDetailsBackToTop = -position.y>1000
      },
      /*监听导航页的点击事件，实现跳转功能*/
      centerItemClick(index){
        this.getCurrentItem(index)
        this.$refs.detailsScroll.scrollTo(0,-this.currentItem.$el.offsetTop,500)

      },
      getCurrentItem(index){
        switch (index){
          case 0:
            this.currentItem=this.$refs.detailsNavBar;
            break
          case 1:
            this.currentItem=this.$refs.detailsItemParams;
            break;
          case 2:
            break
        }
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
