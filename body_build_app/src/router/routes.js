export default [
    // 登录界面
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {
          keepAlive: false,
          index: 1
        }
    },
    // 主页面
    {
        path: '/main',
        component: () => import('@/pages/Main'),
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/pages/Home'),
                meta: {
                  keepAlive: true,
                  index: 2
                }
            },
            {
                path: 'discover',
                name: 'Discover',
                component: () => import('@/pages/Discover'),
                meta: {
                  keepAlive: true,
                  index: 2
                }
            },
            {
                path: 'my',
                name: 'My',
                component: () => import('@/pages/My'),
                meta: {
                  keepAlive: true,
                  index: 2
                }
            },
        ]
    },
    // 个人账户信息页面
    {
      path: '/account',
      name: 'account',
      component: () => import('@/pages/Account'),
      meta: {
        keepAlive: false,
        index: 3
      }
    },
    // 个人发布的笔记页面
    {
      path: '/article',
      component: () => import('@/pages/Article'),
      meta: {
        keepAlive: false,
        index: 3
      }
    },
    // 用户点赞页面
    {
      path:'/like',
      component: () => import('@/pages/Like'),
      meta: {
        keepAlive: false,
        index: 3
      }
    },
    // 用户收藏页面
    {
      path:'/collection',
      component: () => import('@/pages/Collection'),
      meta: {
        keepAlive: false,
        index: 3
      }
    },
    // 记录页面
    {
      path:'/recode',
      component: () => import('@/pages/Recode'),
      meta: {
        keepAlive: false,
        index: 3
      }
    },
    // 笔记详情页面
    {
      path:'/detail/:note_id',
      name:'detail',
      component: () => import('@/pages/Detail'),
      meta: {
        keepAlive: false,
        index: 3
      }
    },
    // 编辑笔记页面
    {
      path:'/edit',
      component: () => import('@/pages/Edit'),
      meta: {
        keepAlive: false,
        index: 3
      }
    },
    // 专项训练页面
    {
      path: '/train/:second_sort_id',
      name: 'train',
      component: () => import('@/pages/Train'),
      meta: {
        keepAlive: false,
        index: 3
      }
    },
    // 具体动作展示页面
    {
      path: '/actions',
      name: 'actions',
      component: () => import('@/pages/Actions'),
      meta: {
        keepAlive: false,
        index: 4
      }
    },
    // 搜索页面
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/pages/Search'),
      meta: {
        keepAlive: false,
        index: 5
      }
    },
    // 新建训练记录页面
    {
      path: '/create',
      name: 'Create',
      component: () => import('@/pages/Create'),
      meta: {
        keepAlive: false,
        index: 4
      }
    },
    // 修改密码界面
    {
      path: '/reset',
      component: () => import('@/pages/Reset')
    },
    // 重定向，在项目跑起来的时候，访问/，立马定位在首页
    {
        path: '*',
        redirect: '/login'
    }
]