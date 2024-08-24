import { createRouter, createWebHashHistory,createWebHistory } from "vue-router";
import { contentRouter } from "./router";

let router = createRouter({
  history: createWebHistory(),
  routes: contentRouter,
  scrollBehavior() {
    return {
      top: 0,
      left: 0
    }
  }
})
export default router