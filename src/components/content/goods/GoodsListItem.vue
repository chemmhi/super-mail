<template>
  <div class="item" @click="itemClick">
    <img :src="imgUrl" alt="" @load="endLoad">
    <div class="item-info">
      <p>{{ item.title }}</p>
      <span class="price">{{ item.price }}</span>
      <span class="collect">{{ item.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    item:{
      type:Object,
      default(){
        return {}
      }
    },
    timer: 0
  },
  data(){
    return {

    }
  },
  methods:{
    endLoad(){
      this.emitter.emit('imgEndLoad')
    },
    itemClick(){
      const iid = this.item.iid ? this.item.iid : this.item.item_id

      this.$router.push({
        path:'/details',
        query:{
          iid:iid
        }
      })
    },

  },
  computed:{
    imgUrl(){
      return this.item.image || this.item.img || this.item.show.img
    }
  },

}
</script>

<style scoped>
  .item {
    width:45%;
    font-size: 13px;
    padding-bottom: 40px;
    position:relative;
    z-index: 0;
  }
  img {
    width:100%;
    border-radius: 5px;
    top:0;
  }
  .item-info {
    width:100%;
    text-align: center;
    overflow: hidden;
    position: absolute;
    bottom: 5px;
  }
  .item-info p {
    width:100%;
    height:14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 3px;
  }
  .item-info .price {
    color: deeppink;
    margin-right: 20px;
  }
  .item-info .collect {
    position: relative;
  }
  .item-info .collect::before {
    content: '';
    width: 14px;
    height: 14px;
    position: absolute;
    left:-15px;
    top:1px;
    background: url("~assets/img/home/collect_icon.png") 0 1px/14px 14px;
    /*background: url("~assets/img/home/collect_icon.png") left top;*/

  }
</style>
