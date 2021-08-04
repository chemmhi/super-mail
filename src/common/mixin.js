import {debounce} from "@/common/utils";


export const imgEventListener = {
  data (){
    return {
      newRefresh: null,
    }
  },
  mounted() {
    if (this.$refs.Scroll){
      this.newRefresh = debounce(this.$refs.Scroll.refresh)
      this.emitter.on('imgEndLoad',this.imgEndLoad)
    }
  },
}
