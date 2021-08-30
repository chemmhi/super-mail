<template>
  <div class="nav-bar">
    <nav-bar>
      <template v-slot:center>
        <div class="center">
          <div v-for="(item,index) in navBarContent"
               class="center-item"
               @click="centerItemClick(index)"
               :class="{ active: currentItem===index }"
          >{{ item }}</div>
        </div>
      </template>
      <template #left>
        <div class="left" @click="goBack"></div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  export default {
     name: "DetailsNavBar",
    components:{
      NavBar
    },
    data(){
      return {
        navBarContent:['商品','参数','评论','推荐'],
        currentItem:0,
      }
    },
    methods:{
      goBack(){
        this.$router.back()
      },
      centerItemClick(index){
        this.currentItem=index
        this.$emit('centerItemClick',index)
      }
    }
  }
</script>

<style scoped>
  .center {
    display: flex;
    font-size: .9rem;
  }
  .center-item {
    flex:1
  }
  .left {
    height: 13px;
    width: 13px;
    border-left: #999999 solid 3px;
    border-top: #999999 solid 3px;
    transform: rotateZ(-45deg);
  }
  .active {
    color:var(--color-high-text)
  }
  .nav-bar {
    font-weight: bold;
  }

</style>
