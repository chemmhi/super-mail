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
        <div class="left" @click="goBack">&lt</div>
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
    height: 100%;
    width: 100%;
    font-size: 2rem;
    color:rgba(0,0,0,.6)
  }
  .active {
    color:var(--color-high-text)
  }
  .nav-bar {
    font-weight: bold;
  }

</style>
