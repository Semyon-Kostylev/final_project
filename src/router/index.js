import { createRouter, createWebHistory } from 'vue-router';
import PageRegistration from '@/components/pages/PageRegistration.vue';
import PageAuthorization from '@/components/pages/PageAuthorization.vue';
import PagePassword from '@/components/pages/PagePassword.vue';
import ProfileMain from '@/components/ProfileMain.vue';

const routes = [
  {
    path: '',
    name: 'registration',
    component: PageRegistration,
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: PageAuthorization,
  },
  {
    path: '/restore-password',
    name: 'restore-password',
    component: PagePassword,
  },
  {
    path: '/profile-main',
    name: 'profile-main',
    component: ProfileMain,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
