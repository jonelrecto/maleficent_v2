export default [
  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404'
    }
  },

  {
    path: '/login',
    name: 'Login',
    meta: {
      public: true,
    },
    component: () => import(`@/views/Login.vue`)
  },
  {
    path: '/',
    name: 'Root',
    meta: {
      requiresAuth: true,
      redirect: '/login'
    },
    redirect: {
      name: 'Dashboard'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(`@/views/Dashboard.vue`)
  },
  {
    path: '/walkin',
    meta: {
      public: true,
    },
    name: 'Walkin',
    component: () => import(`@/views/Walkin.vue`)
  },
  {
    path: '/courses',
    meta: {
      breadcrumb: true,
    },
    name: 'Courses',
    component: () => import(`@/views/Courses.vue`)
  },
  {
    path: '/events',
    meta: {
      breadcrumb: true,
    },
    name: 'Event',
    component: () => import(`@/views/Events.vue`),
    children: [
      {
        path: '/events',
        name: 'Events',
        component: () => import (`@/components/events/event/EventList`),
      },
      {
        path: '/events/:eventKey/seasons', 
        name: 'Seasons',
        component: () => import (`@/components/events/season/EventSeasons`),
      },
      {
        path: '/events/seasons/batches',
        name: 'Batches',
        component: () => import (`@/components/events/EventBatches`)
      }
    ]
  },
  {
    path: '/schedules',
    meta: {
      breadcrumb: true,
    },
    name: 'Schedules',
    component: () => import(`@/views/Schedules.vue`)
  },

  // error states
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
  
  // {
  //   path: '/403',
  //   name: 'AccessDenied',
  //   component: () => import(`@/views/Deny.vue`)
  // },
]
  
