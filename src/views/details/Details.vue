<template>
  <div id="details">
    <details-nav-bar class="details-nav" @centerItemClick="centerItemClick" ref="detailsNavBar"/>
    <scroll class="content" ref="Scroll" :probe-type="3" @scroll="scroll">
      <details-swiper :top-image="topImage" />
      <details-goods :goods="goods" />
      <details-shop-info :shop="shop" />
      <details-goods-list :details-info="detailsInfo" />
      <details-item-params :item-params="itemParams" ref="detailsItemParams"/>
      <details-comments :comment-info="commentInfo" ref="detailsComments"/>
      <goods-list :good-list="recommendsImage" ref="detailsRecommend"/>
    </scroll>
    <back-to-top @click="detailsBackToTop" v-show="showDetailsBackToTop" />
    <details-bottom-bar @addToCart="addToCart"/>
    <toast :message="toastMessage" :is-show="toastShow"/>
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
  import DetailsBottomBar from "@/views/details/children-component/DetailsBottomBar";
  import AddToCartPrompt from "@/views/details/children-component/AddToCartPrompt";

  import Scroll from "@/components/common/scroll/Scroll";
  import BackToTop from "@/components/content/back-to-top/BackToTop";

  import {getDetails, GoodsDetails, Shop, ItemParams, getRecommend} from "@/network/details";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {imgEventListener} from "@/common/mixin";
  import {debounce} from "@/common/utils";

  import {mapActions} from 'vuex'
  import Toast from "@/components/common/toast/Toast";

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
        positionY:0,
        showPrompt: false,
        toastMessage: '',
        toastShow: false,
      }
    },
    components:{
      Toast,
      GoodsList,
      DetailsNavBar,
      DetailsSwiper,
      DetailsGoods,
      DetailsShopInfo,
      DetailsGoodsList,
      DetailsItemParams,
      DetailsComments,
      DetailsBottomBar,
      AddToCartPrompt,

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
      ...mapActions({
        add:'addToCart',
      }),
      /*网络请求,请求详情页的所有数据*/
      getDetailsContent(iid){
        getDetails(iid).then((res)=>{
          const data=res ? res.result : {}
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
        this.$refs.Scroll.scrollTo(0,0,500)
      },
      /*监听scroll组件内部的点击事件*/
      scroll(position){
        this.showDetailsBackToTop = -position.y>1000
        this.positionY=-position.y
        for (let i = 1; i< this.itemOffsetTop.length; i++){
          if (this.itemOffsetTop[i] > this.positionY) {
            if (this.$refs.detailsNavBar) this.$refs.detailsNavBar.currentItem = i-1;
            break
          }
        }
      },
      /*监听导航页的点击事件，实现跳转功能*/
      centerItemClick(index){
        this.$refs.Scroll.scrollTo(0,-this.itemOffsetTop[index],500)
      },

      addToCart(){
        const itemOfCart = {};
        itemOfCart.iid = this.iid;
        itemOfCart.desc = this.goods.desc;
        itemOfCart.title = this.goods.title;
        itemOfCart.price = this.goods.realPrice;
        itemOfCart.image = this.topImage[0];
        itemOfCart.count = 1;
        itemOfCart.isChecked = true;
        // this.$store.dispatch('addToCart',itemOfCart)
        this.add(itemOfCart).then(res=>{
          this.toastMessage = res;
          this.toastShow = true;
          setTimeout(()=>{
            this.toastShow = false;
            this.toastMessage = '';
          },1500)
        })

      },

      imgEndLoad(){
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
   height: calc(100vh - 44px - 49px);
   /*height: 100vh;*/
   overflow-y: hidden;

 }
 .prompt{
   position: fixed;
   z-index: 100;
   top: 0;
 }
</style>
