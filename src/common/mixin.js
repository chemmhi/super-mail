import {debounce} from "@/common/utils";


export const imgEventListener = {
  data (){
    return {
      newRefresh: null,
    }
  },
  mounted() {
    if (this.$refs.detailsScroll){
      this.newRefresh = debounce(this.$refs.detailsScroll.refresh)
      this.emitter.on('imgEndLoad',this.detailsImgEndLoad)
    }
  },
}
