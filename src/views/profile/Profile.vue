<template>
  <grid-view>
    <div v-for="i in 11">
      <div>hello world</div>
    </div>
  </grid-view>

</template>

<script>
import GridView from "@/components/common/grid-view/GridView";

export default {
  name: "Profile",
  components:{
    GridView,
  }
}
</script>

<style scoped>

</style>
