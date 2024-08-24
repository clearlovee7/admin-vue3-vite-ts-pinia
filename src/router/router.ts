//静态路由
export const contentRouter = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/',
    //@ts-ignore
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    meta: {
      title: '',
      hidden: false,
      icon: ''
    },
    children: [
      {
        path: '/home',
        //@ts-ignore
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled'
        }
      }
    ]
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Platform'
    }
  },

  {
    path: '/404',
    //@ts-ignore
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true
    }
  },
]

//权限路由
export const asyncRoute = [
  {
    path: '/acl',
    //@ts-ignore
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    redirect: '/acl/user',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock'
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        }
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Monitor'
        }
      }
    ]
  },
  {
    path: '/product',
    //@ts-ignore
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    redirect: '/product/trademark',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods'
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCartFull'
        }
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'ChromeFilled'
        }
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Calendar'
        }
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Orange'
        }
      }
    ]
  },
]

//任意路由
export const anyRoute = 
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: 'any',
      hidden: true
    }
  }
