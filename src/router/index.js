import { createRouter, createWebHistory } from 'vue-router';

import PageRegistration from '@/components/pages/PageRegistration.vue';
import PageAuthorization from '@/components/pages/PageAuthorization.vue';
import PageForget from '@/components/pages/PageForget.vue';

import PageMain from '@/components/pages/PageMain.vue';

import EditUser from '@/components/edit/EditUser.vue';
import EditPassword from '@/components/edit/EditPassword.vue';

import MyLikes from '@/components/my/MyLikes.vue';
import MyPublications from '@/components/my/MyPublications.vue';
import MyPublication from '@/components/my/MyPublication.vue';
import MyComments from '@/components/my/MyComments.vue';

import AllPublications from '@/components/all/AllPublications.vue';
import AllAuthors from '@/components/all/AllAuthors.vue';

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
    path: '/profile',
    component: PageMain,
    children: [
      // profile
      {
        path: '/profile',
        name: 'user',
        component: EditUser,
      },
      {
        path: '/password',
        name: 'password',
        component: EditPassword,
      },
      // my
      {
        name: 'my-publications',
        path: '/my-publications',
        component: MyPublications,
      },
      {
        name: 'my-publication',
        path: '/my-publications/:id',
        component: MyPublication,
      },
      {
        name: 'my-likes',
        path: '/my-likes',
        component: MyLikes,
      },
      {
        name: 'my-comments',
        path: '/my-comments',
        component: MyComments,
      },
      // all
      {
        name: 'publications',
        path: '/publications',
        component: AllPublications,
      },
      {
        name: 'authors',
        path: '/authors',
        component: AllAuthors,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
