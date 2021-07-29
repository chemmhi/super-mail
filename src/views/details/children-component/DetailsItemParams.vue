<template>
  <div class="params-wrap" v-if="itemParamsIsOk">
    <table class="rules-params">
      <caption>尺码表</caption>
      <tr v-for="index in itemParams.rulesParams[0]">
        <td v-for="indey in index">{{indey}}</td>
      </tr>
      </table>
    <div class="disclaimer">{{itemParams.disclaimer}}</div>
    <table class="rules-params other">
      <caption>其他参数</caption>
      <tr v-for="item in itemParams.infoParams">
        <td> {{item.key}} </td>
        <td>{{item.value}}</td>
      </tr>
    </table>
    <div v-if="itemParams.infoParams.images">
      <img :src="itemParams.infoParams.images[0]" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsItemParams",
  props:{
    itemParams:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
      itemParamsIsOk: false,
    }
  },
  methods:{
    catList(list1,list2){
      /*用于将list2中的列表，除第一个元素外，全部整合到list1*/
      for (let index in list1) {
        list1[index].push(...list2[index].slice(1))
      }
      return list1
    }
  },
  watch:{
    itemParams(newValue,oldValue){
      try {
        if (newValue.rulesParams[0].length===newValue.rulesParams[1].length){
        newValue=this.catList(newValue.rulesParams[0],newValue.rulesParams[1])
        }
      }
      catch (error) {

      }
      this.itemParamsIsOk = true;
    }
  }
}
</script>

<style scoped>
  .params-wrap {
		border-top: 4px solid #ececec;
		border-bottom: 4px solid #ececec;
    margin: 1rem .6rem 1rem .6rem;
    padding-top: 1rem;
    font-size: .8rem;
	}
  .params-wrap table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }
  .rules-params td {
    border-top: 1px solid #D0D0D0FF;
    height: 2.5rem;
  }
  .rules-params tr:last-child td{
    border-bottom: 1px solid #D0D0D0FF;
  }
  .rules-params caption {
    text-align: center;
    font-weight: bold;
    margin: 1.5rem 0 1.5rem 0;
  }
  .other tr td {
    text-align: left;
    padding-left: 1rem;
  }
  .other tr td:first-child {
    width: 3rem;
  }
  .disclaimer {
    margin-top: .6rem;
  }
</style>
