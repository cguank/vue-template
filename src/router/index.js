import Vue from 'vue'
import Router from 'vue-router'

import { isLogin } from "@/assets/js/utils";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/withusercenter'),
      meta: {
        title: '首页',
        requireAuth: false
      },
      children: [{
        path: '/home',
        component: () => import('@/pages/home'),
        meta: {
          title: '首页',
          requireAuth: false
        }
      }
      ]
    }

  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    //console.log('token是', localStorage.getItem('token'))
    if (isLogin()) {
      next();
    } else {
      next({
        path: '/user_login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})
export default router
