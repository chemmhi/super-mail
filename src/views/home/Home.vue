<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contextScroll"
            @pull-up-end="pullUp">
      <home-swiper :banners="banners"
                   @swiperImgLoad="swiperImgLoad"/>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature></home-feature>
      <tab-controller :content="['流行','新款','精选']"
                      @tabSwitch="tabClick"
                      ref=tabController1 />
      <goods-list :goodList="currentTypeContent"></goods-list>
    </scroll>
    <back-to-top @click="bk2TopClick" v-show="showBk2Top"/>
    <tab-controller :content="['流行','新款','精选']"
                    @tabSwitch="tabClick"
                    v-show="showTabControl"
                    ref=tabController2 />
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "@/components/common/scroll/Scroll";

  import TabController from "@/components/content/tab-controller/TabController";
  import GoodsList from "@/components/content/goods/GoodsList";
  import BackToTop from "@/components/content/back-to-top/BackToTop";

  import HomeSwiper from "@/views/home/home-child-component/HomeSwiper";
  import HomeRecommendView from "@/views/home/home-child-component/HomeRecommendView";
  import HomeFeature from "@/views/home/home-child-component/HomeFeature";

  import {getHomeMultiData,getHomeGoods} from "network/home";
  import {imgEventListener} from "@/common/mixin";

  export default {
    name: "Home",
    components:{
      NavBar,
      Scroll,

      TabController,
      GoodsList,
      BackToTop,

      HomeSwiper,
      HomeRecommendView,
      HomeFeature,
    },
    data(){
      return {
        currentType:'pop',
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        showBk2Top:false,
        showTabControl:false,
        timer:null,
        tabControllerOffsetTop:0,
        currentScrollY:0,
      }
    },
    created(){
      this.getHomeMultiDataContent();
      this.getHomeGoodsContent('pop')
      this.getHomeGoodsContent('new')
      this.getHomeGoodsContent('sell')

    },
    mixins:[imgEventListener],
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.currentScrollY,0)
    },
    deactivated() {
      this.currentScrollY=this.$refs.scroll.scroll.y
    },
    methods:{
      /*
       *  事件监听
      */
      tabClick(index){
        switch (index){
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
        this.$refs.tabController1.currentIndex=index
        this.$refs.tabController2.currentIndex=index
      },
      bk2TopClick(){
        this.$refs.scroll.scrollTo(0,0,1000)
      },

      contextScroll(position){
        this.showBk2Top=-position.y>1000
        this.showTabControl=-position.y>this.tabControllerOffsetTop
      },
      pullUp(){
        this.getHomeGoodsContent(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },
      swiperImgLoad(){
        this.tabControllerOffsetTop=this.$refs.tabController1.$el.offsetTop
      },
      debounce(func,delay){
      let timer=null
      //   console.log(this.timer)
        return (...args)=>{
          if (timer) {clearTimeout(timer)}
          timer = setTimeout (()=>{
            func(args)
          }, delay)
        }

      },
      /*
       *  网络请求
       */
      getHomeMultiDataContent(){
        getHomeMultiData().then((res)=>{
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
      })
      },
      getHomeGoodsContent(type){
        let page=this.goods[type].page+1;
        getHomeGoods(type,page).then((res)=>{
          this.goods[type].list.push(...res.data.list)
        });
        this.goods[type].page++
      }
    },
    computed:{
      currentTypeContent(){
        return this.goods[this.currentType].list
      },
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color:black;
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    z-index: 9;
  }
  img {
    width:100%
  }
  .content {
    position: absolute;
    bottom: 49px;
    top:44px;
    left:0;
    right:0;
    overflow-y: hidden;
  }
</style>
