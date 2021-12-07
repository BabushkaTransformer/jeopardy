import {createRouter, createWebHistory} from "vue-router";
import HomeScreen from "../pages/HomeScreen";
import GamePage from "../pages/GamePage";
import Statistic from "../pages/Statistic";
import store from "../store";

const routes = [
  {
    path: '/',
    component: HomeScreen,
  },
  {
    path: '/game',
    component: GamePage,
    meta: {gameStarted: true}
  },
  {
    path: '/statistic',
    component: Statistic,
  }
]


const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.gameStarted)) {
    if(!store.getters.gameStarted){
      next('/')
    }else {
      next()
    }
  } else {
    next();
  }
})

export default router;
