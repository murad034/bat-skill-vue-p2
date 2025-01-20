import { createStore } from "vuex";
import postModule from "./postModule";

const store = createStore({
  // state(){
  //     return {
  //         userName: "Rafiqul Islam Murad"
  //     }
  // },
  state: {
    userName: "Rafiqul Islam Murad",
  },

  modules: {
    posts: postModule,
  },
});

export default store;
