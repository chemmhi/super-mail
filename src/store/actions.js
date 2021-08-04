export default {
  addToCart(context,payload){
    return new Promise((resolve,reject)=>{
      let oldProduct = null
      oldProduct = context.state.cartList.find(item=>item.iid === payload.iid)

      if (oldProduct) {
        context.commit('addCounter',oldProduct)
        resolve('商品数量+1')
      }else{
        context.commit('addItem',payload)
        resolve('添加购物车成功')
      }
    })
  },
}
