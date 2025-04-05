import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeTasks from "../views/HomeTasks.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeTasks,
  },
  {
    path: "/tasksFavorites",
    name: "tasksFavorites",

    component: () => import("../views/TasksFavorites.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../components/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
