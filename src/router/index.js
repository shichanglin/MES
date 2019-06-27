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
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
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
    redirect: '/dashboard', meta: {
      title: 'dashboard'
    },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '欢迎', icon: 'dashboard' }
    }]
  },
  {
    path: '/saffManagement',
    component: Layout,
    redirect: '/saffManagement/addMessage',
    name: 'saffManagement',
    alwaysShow: true,
    meta: {
      title: '人员管理',
      icon: '人 (1)'
    },
        children: [
          {
            path: 'Message',
            component: () => import('@/views/staffMessage/staff/staffChange/index'),
            name: 'Message',
            meta: { title: '信息管理' }
          },
      // {
      //   path: '/autho',
      //   name: "autho",
      //   component: () => import('@/views/staffMessage/autho/index'),
      //   meta: { title: '权限授权管理' },
      //   alwaysShow: true,
      //   children: [
      //     {
      //       path: 'authoAdd',
      //       component: () => import('@/views/staffMessage/autho/authoAdd/index'),
      //       name: 'authoAdd',
      //       meta: { title: '添加授权' }
      //     },
      //     {
      //       path: 'authoChange',
      //       component: () => import('@/views/staffMessage/autho/authoChange/index'),
      //       name: 'authoChange',
      //       meta: { title: '修改权限' }
      //     },
      //     {
      //       path: 'authoDel',
      //       component: () => import('@/views/staffMessage/autho/authoDel/index'),
      //       name: 'authoDel',
      //       meta: { title: '查询与删除' }
      //     },
        
      //   ]
      // }
    ]
  },
  {
    //设备管理
    path: '/device',
    component: Layout,
    redirect: '/device/addDevice',
    name: "device",
    alwaysShow: true ,
    meta: {
      title: "工作中心管理",
      icon: '设备'
    },
    children: [
      {
        path: 'addDevice',
        component: () => import('@/views/devicemanager/addDevice/index'),
        meta: {
          title: "信息管理"
        }
      },
    ]

  },
  {
    //库存管理
    path: '/repertory',//
    component: Layout,
    redirect: '/repertory/materialadd',
    name: "repertory",
    alwaysShow: true ,
    meta: {
      title: "库存管理",
      icon: '库存'
    },
    children: [
      {
        path: 'material',
        component: () => import('@/views/repertory/material/index'),
        meta: {
          title: "物料管理"
        }
      },
      {
        path: 'product',
        component: () => import('@/views/repertory/material/index'),
        meta: {
          title: "产品管理"
        }
      },
    ]

  },
  {
    //生产线管理
    path: '/productLine',//
    component: Layout,
    redirect: '/productLine/pL_change',
    name: "productLine",
    alwaysShow: true ,
    meta: {
      title: "生产线管理",
      icon: '生产线配置'
    },
    children: [
      {
        path: 'pL_change',
        component: () => import('@/views/productLine/pl_change'),
        meta: {
          title: "创建生产线"
        }
      },
    
    ]

  },
  {
    //图表
    path: '/charts',
    component: Layout,
    name: "charts",
    alwaysShow: true ,
    redirect:"/charts/gantcharts",
    meta: {
      title: "图表部分",
      icon: '甘特图'
    },
    children: [
      {
        path: 'gantcharts',
        component:()=> import("@/views/chart/index"),
        meta: {
          title: "生产线甘特图"
        }
      },
    
    ]
  },







  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
