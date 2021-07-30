<template>
  <div id="details">
    <details-nav-bar class="details-nav" @centerItemClick="centerItemClick" ref="detailsNavBar"/>
    <scroll class="content" ref="detailsScroll" :probe-type="3" @scroll="scroll">
      <details-swiper :top-image="topImage" />
      <details-goods :goods="goods" />
      <details-shop-info :shop="shop" />
      <details-goods-list :details-info="detailsInfo" />
      <details-item-params :item-params="itemParams" ref="detailsItemParams"/>
      <details-comments :comment-info="commentInfo" ref="detailsComments"/>
      <goods-list :good-list="recommendsImage" ref="detailsRecommend"/>
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
  import DetailsComments from "@/views/details/children-component/DetailsComments";

  import Scroll from "@/components/common/scroll/Scroll";
  import BackToTop from "@/components/content/back-to-top/BackToTop";

  import {getDetails, GoodsDetails, Shop, ItemParams, getRecommend} from "@/network/details";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {imgEventListener} from "@/common/mixin";
  import {debounce} from "@/common/utils";

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
        commentInfo:[],
        recommendsImage:[],
        itemOffsetTop:[],
        getItemOffsetTop:null,
        positionY:0
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
      DetailsComments,

      Scroll,
      BackToTop,
    },
    created(){
      this.getDetailsContent(this.iid)
      this.getRecommendImage()
      this.getItemOffsetTop = debounce(()=>{
          this.itemOffsetTop = []
          this.itemOffsetTop.push(0)
          if (this.$refs.detailsItemParams) this.itemOffsetTop.push(this.$refs.detailsItemParams.$el.offsetTop)
          if (this.$refs.detailsComments) this.itemOffsetTop.push(this.$refs.detailsComments.$el.offsetTop)
          if(this.$refs.detailsRecommend) this.itemOffsetTop.push(this.$refs.detailsRecommend.$el.offsetTop)
          this.itemOffsetTop.push(Number.MAX_VALUE)
        },)
    },
    mixins:[imgEventListener],
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
          if (data.rate.cRate) this.commentInfo= data.rate.list
        })
      },
      getRecommendImage(){
        getRecommend().then((res)=>{
          this.recommendsImage = res.data.list
        })
      },
      /*回到顶部点击事件*/
      detailsBackToTop(){
        this.$refs.detailsScroll.scrollTo(0,0,500)
      },
      /*监听scroll组件内部的点击事件*/
      scroll(position){
        this.showDetailsBackToTop = -position.y>1000
        this.positionY=-position.y
        for (let i = 1; i< this.itemOffsetTop.length; i++){
          if (this.itemOffsetTop[i] > this.positionY) {
            this.$refs.detailsNavBar.currentItem = i-1;
            break
          }
        }
      },
      /*监听导航页的点击事件，实现跳转功能*/
      centerItemClick(index){
        this.$refs.detailsScroll.scrollTo(0,-this.itemOffsetTop[index],500)
      },

      detailsImgEndLoad(){
        this.newRefresh()
        this.getItemOffsetTop()
      },
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
