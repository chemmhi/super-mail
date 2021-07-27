<template>
  <details-nav-bar/>
  <details-swiper :top-image="topImage"></details-swiper>
  <details-goods :goods="goods"/>
</template>

<script>
  import DetailsNavBar from "@/views/details/children-component/DetailsNavBar";
  import DetailsSwiper from "@/views/details/children-component/DetailsSwiper";
  import DetailsGoods from "@/views/details/children-component/DetailsGoods";

  import {getDetails, GoodsDetalils} from "@/network/details";
  import GoodsList from "@/components/content/goods/GoodsList";

  export default {
    name: "Details",
    data(){
      return {
        iid: this.$route.query.iid,
        topImage: null,
        goods:{},
      }
    },
    components:{
      GoodsList,
      DetailsNavBar,
      DetailsSwiper,
      DetailsGoods,
    },
    created(){
      this.getDetailsContent(this.iid)
    },
    methods:{
      getDetailsContent(iid){
        getDetails(iid).then((res)=>{
          const goods = new GoodsDetalils(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
          this.topImage=res.result.itemInfo.topImages
          this.goods=goods
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>

</style>
