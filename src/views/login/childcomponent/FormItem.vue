<template>
  <div class="form-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FormItem"
}
</script>

<style scoped>
  .form-item{
    margin: 10px 0;
  }
</style>
