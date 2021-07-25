<template>
  <div class="recommend">
    <div v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props:{
    recommends:{
      type:Array,
      default(){
        return []
        }
      }
    },
}
</script>

<style scoped>
  .recommend {
    display:flex;
    justify-content: space-between;
    font-size: 12px;
    margin-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;

    border-bottom: 10px solid #eee;
  }
  img {
    width:70px;
    height:70px;
    margin-bottom: 10px;
  }
  a div {
    margin-bottom: 5px;
  }
</style>
