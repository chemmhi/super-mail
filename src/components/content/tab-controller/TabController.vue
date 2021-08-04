<template>
  <div class="tab-controller">
    <div class="tab-item" v-for="(item,index) in content"
         :class="{active:index===currentIndex}"
         @click="itemClick(index)"
         :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabController",
  props:{
    content:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index
      this.$emit('tabSwitch',index)
    }
  }
}
</script>

<style scoped>
  .tab-controller{
    display: flex;
    font-size: 14px;
    line-height: 44px;
    text-align: center;
    z-index: 7;
    position: sticky;
    top:44px;
    background-color: var(--color-background);
    font-weight: bold;
  }
  .tab-item {
    flex:1;
  }
  .tab-item span {
    padding: 0 5px 3px 5px;
    border-bottom: 3px solid #eee;
  }
  .tab-item.active {
    color:var(--color-high-text);
  }
  /*.tab-item.active span {*/
  /*  background-color: var(--color-tint);*/
  /*}*/
</style>
