import { createRouter, createWebHashHistory, useRouter } from 'vue-router';
import screenDevelopViewer from '../views/screenDevelopViewer.vue';
import screenViewer from '../views/screenViewer.vue';
import defaultEntrance from '../views/defaultEntrance.vue';
import { useAppStore } from '../store/index';

const routes: any = [
  {
    path: '/',
    name: 'home',
    // component: defaultEntrance,
    redirect: '/p/home',
  },
  {
    path: '/c/:configId',
    component: screenViewer,
    name: 'customScreenViewer',
  },
  {
    path: '/p/:screenName',
    component: screenViewer,
    name: 'projectScreenViewer',
  },
  {
    path: '/dev/c/:configId',
    component: screenDevelopViewer,
    name: 'customDevScreenViewer',
  },
  {
    path: '/dev/p/:screenName',
    component: screenDevelopViewer,
    name: 'projectDevScreenViewer',
  },
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token');
  const store = useAppStore();
  if (!token && to.params?.screenName != 'login') {
    next({ path: '/p/login' });
  } else if (token && to.params?.screenName == 'login') {
    next({ path: '/p/home' });
  } else {
    next();
  }
});

export default router;
