<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'#5c5c5c',
    }
  },
  data(){
      return {
        // isActive:false
      }
    },
  methods:{
    itemClick(){
      this.$router.push(this.path)
    },
  },
  computed:{
      isActive(){
        return this.$route.path.indexOf(this.path)!==-1
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      },
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex:1;
    text-align: center;
    font-size: 14px;
  }
  .tab-bar-item:hover {
    background-color: #dedede;
  }
</style>
