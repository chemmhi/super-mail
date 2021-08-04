<template>
  <scroll id="tab-menu" ref="categoryTabScroll">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(item, index) in categories"
           :class="{active: index===currentIndex}"
           :key="index"
           @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from "@/components/common/scroll/Scroll";
	export default {
		name: "CategoryTabMenu",
    components: {
		  Scroll
    },
    props: {
		  categories: Array
    },
    data() {
		  return {
		    currentIndex: 0
      }
    },
    methods: {
		  itemClick(index) {
        this.currentIndex = index
        this.$emit('selectItem', index)
      }
    },
    updated() {
		  this.$refs.categoryTabScroll.refresh()
    }
  }
</script>

<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 1rem;
  }
  .menu-list-item.active {
    font-weight: bold;
    color: black;
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
