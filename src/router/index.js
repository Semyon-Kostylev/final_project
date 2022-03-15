import { createRouter, createWebHistory } from 'vue-router';
import PageRegistration from '@/components/pages/PageRegistration.vue';
import PageAuthorization from '@/components/pages/PageAuthorization.vue';
import PageForget from '@/components/pages/PageForget.vue';
import PageUser from '@/components//pages/PageUser.vue';
import PagePassword from '@/components/pages/PagePassword.vue';
import PagePublications from '@/components/pages/PagePublications.vue';
import PageLikes from '@/components/pages/PageLikes.vue';
import PageComments from '@/components/pages/PageComments.vue';

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
    path: '/forget-password',
    name: 'forget-password',
    component: PageForget,
  },
  {
    path: '/profile-user',
    name: 'profile-user',
    component: PageUser,
  },
  {
    path: '/profile-password',
    name: 'profile-password',
    component: PagePassword,
  },
  {
    path: '/publications',
    name: 'publications',
    component: PagePublications,
  },
  {
    path: '/likes',
    name: 'likes',
    component: PageLikes,
  },
  {
    path: '/comments',
    name: 'comments',
    component: PageComments,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
