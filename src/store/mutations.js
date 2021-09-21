export default {
  addCounter(state,payload){
    payload.count++
  },
  addItem(state,payload){
    state.cartList.push(payload)
  },
  deleteItem(state,payload){
    let tmp = [...state.cartList]
    for(let i= tmp.length-1; i>=0; i--){
      if(tmp[i].isChecked){
        state.cartList.splice(i,1)
      }
    }
  },
  changeToLogin(state,payload){
    state.isLogin = true
  },
  loadingCart(state,payload){
    state.cartList = payload
  },
  setUserName(state, payload){
    state.userName = payload
  },
  setUserInfo(state, payload){
    state.userInfo = payload
  },
  setUserImgUrl(state,payload){
    state.userInfo.profileImgUrl = payload
  }
}
