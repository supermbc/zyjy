import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'index',
      component: ()=> import("../views/Home.vue")
    },
    // {
    //   path: '/index',
    //   name: 'index',
    //   component: ()=> import("../views/Home.vue")
    // },
    {
      path: '/login',
      name: 'login',
      component: ()=> import("../views/Login.vue")
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: ()=> import("../views/MyInfo.vue")
    },
    {
      path: '/nengli',
      name: 'nengli',
      component: () => import('../views/class/ClassList.vue'),
    },{
        path: '/classlist',
        name: 'classlist',
        component: () => import('../views/class/ClassList.vue')
      },{
        path: '/calssfication',
        name: 'calssfication',
        component: () => import('../views/class/ClassFication.vue')
      }
    ,{
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/Admin.vue'),
    },{
        path: '/student',
        name: 'student',
        component: () => import('../views/admin/Student.vue')
      },{
        path: '/teacher',
        name: 'teacher',
        component: () => import('../views/admin/Teacher.vue')
      }
    ,{
      path: '/nengli',
      name: 'nengli',
      component: () => import('../views/power/UserManager.vue'),
    },{
        path: '/usermanager',
        name: 'usermanager',
        component: () => import('../views/power/UserManager.vue')
      },{
        path: '/role',
        name: 'role',
        component: () => import('../views/power/Role.vue')
      },{
        path: '/zone',
        name: 'zone',
        component: () => import('../views/fun/Zone.vue')
      },{
        path: '/zone',
        name: 'zone',
        component: () => import('../views/fun/Zone.vue')
      },{
        path: '/order',
        name: 'order',
        component: () => import('../views/fun/Order.vue')
      },{
        path: '/addclass',
        name: 'addclass',
        component: () => import('../views/fun/addClass.vue')
      }
  ]
})
export default router
