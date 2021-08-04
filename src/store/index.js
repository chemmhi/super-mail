import {createStore} from "vuex";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";

const state = {
  cartList:[],
}

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
})
