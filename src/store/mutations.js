export default {
  addCounter(state,payload){
    payload.count++
  },
  addItem(state,payload){
    state.cartList.push(payload)
  },
  checked(state,payload){
    // state.is
  }
}
