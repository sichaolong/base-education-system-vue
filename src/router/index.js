import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRouters = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouters
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()

  // 1. 保证 用户退出之后，将路由缓存记录换为/login
  router.replace({ path: '/login' });
  // 2. 新用户登录之后从新获取路由列表
  location.reload()
  router.matcher = newRouter.matcher // reset router
}

export default router

export const asyncRouterMap = [
  {
    path: '/declaration-form',
    component: Layout,
    children: [{
      path: 'declaration-form',
      name: 'DeclarationForm',
      //declaration-form/index
      component: () => import('@/views/declaration-form/index'),
      meta: { role: ['基层教学组织管理员'], title: '备案表填报', icon: 'form' }
    }]
  },

  {
    path: '/approval-page',
    component: Layout,
    children: [{
      path: 'approval-page',
      name: 'ApprovalPage',
      component: () => import('@/views/approval-page/index'),
      meta: { role: [, '校级管理员', '院级管理员'], title: '备案表审核', icon: 'approval' }
    },
    {
      path: 'approval-page',
      name: 'ApprovalPage',
      component: () => import('@/views/approval-page/index'),
      meta: { role: ['基层教学组织管理员'], title: '备案表状态', icon: 'approval' }
    },
    {
      path: 'approval-page',
      name: 'ApprovalPage',
      component: () => import('@/views/approval-page/index'),
      meta: { role: ['评审专家'], title: '备案表评分', icon: 'approval' }
    }]
  },

  {
    path: '/detail-page',
    component: Layout,
    children: [{
      path: 'detail-page',
      name: 'detailPage',
      component: () => import('@/views/detail-page/index'),
      meta: { role: ['基层教学组织管理员', '校级管理员', '院级管理员', '评审专家'], title: '备案表详情' },
      hidden: true
    }]
  },

  {
    path: '/user-management',
    component: Layout,
    children: [{
      path: 'user-management',
      name: 'UserManagement',
      component: () => import('@/views/user-management/index'),
      meta: { role: ['系统管理员', '校级管理员', '院级管理员'], title: '用户管理', icon: 'user' }
    }]
  },

  {
    path: '/dispatch-form',
    component: Layout,
    children: [{
      path: 'dispatch-form',
      name: 'DispatchForm',
      component: () => import('@/views/dispatch-form/index'),
      meta: { role: ['校级管理员'], title: '备案表的分配', icon: 'dispatch' }
    }]
  },

   // 数据维护页面
   {
    path: '/data-maintenance',
    component: Layout,
    children: [{
      path: 'data-maintenance',
      name: 'DataMaintenance',
      component: () => import('@/views/data-maintenance/index'),
      meta: { title: '数据维护', role:['系统管理员'], icon: 'pie' }
    }]
  },


  // {
  //   path: '/data-analysis',
  //   component: Layout,
  //   children: [{
  //     path: 'data-analysis',
  //     name: 'DataAnalysis',
  //     component: () => import('@/views/data-analysis/index'),
  //     meta: { title: '数据分析', icon: 'pie' }
  //   }]
  // },

 
  // {
  //   path: '/information',
  //   component: Layout,
  //   meta: { role: ['教师'], title: '信息填报', icon: 'user-info' },
  //   children: [{
  //     path: 'teacher-info',
  //     name: 'TeacherInfo',
  //     component: () => import('@/views/information/teacher-info'),
  //     meta: { title: '个人概况' }
  //   }, {
  //     path: 'research-info',
  //     name: 'ResearchInfo',
  //     component: () => import('@/views/information/research-info'),
  //     meta: { title: '教学研究内容' }
  //   }, {
  //     path: 'competition-info',
  //     name: 'CompetitionInfo',
  //     component: () => import('@/views/information/competition-info'),
  //     meta: { title: '教学竞赛内容' }
  //   }]
  // },

  // 打分页面
  // {
  //   path: '/give-mark',
  //   component: Layout,
  //   children: [{
  //     path: 'give-mark',
  //     name: 'giveMark',
  //     component: () => import('@/views/give-mark/index'),
  //     meta: { role: ['系统管理员','评审专家'],title: '评分', icon: 'el-icon-s-data' }
  //   }]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


