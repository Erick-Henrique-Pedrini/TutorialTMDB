  import { createRouter, createWebHistory } from 'vue-router';
  import Home from '@/views/Home.vue';
  
  const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/filmes',
      name: 'Movies',
      component: () => import('@/views/MoviesView.vue'),
    },
    {
      path: '/tv',
      name: 'TV',
      component: () => import('@/views/TvViews.vue'),
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;