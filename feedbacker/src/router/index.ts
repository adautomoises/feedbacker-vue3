import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Home = () => import("../views/Home/index.vue");
const Feedbacks = () => import("../views/Feedbacks/index.vue");
const Credentials = () => import("../views/Credentials/index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/feedbacks",
    name: "Feedbacks",
    component: Feedbacks,
    meta: {
      hasAuth: true,
    },
  },
  {
    path: "/credenciais",
    name: "Credenciais",
    component: Credentials,
    meta: { hasAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: {
      name: "Home",
    },
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
