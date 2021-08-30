export default {
  addCounter(state,payload){
    payload.count++
  },
  addItem(state,payload){
    state.cartList.push(payload)
  },
  deleteItem(state,payload){
    console.log(Array(...state.cartList));
    Array(...state.cartList).forEach((item ,index, list)=>{
      delete state.cartList[index]
    })
    console.log(Array(...state.cartList));
  },
  changeToLogin(state,payload){
    state.isLogin = true
  },
  loadingCart(state,payload){
    state.cartList = payload
  },
  setUserName(state, payload){
    state.userName = payload
  }
}
