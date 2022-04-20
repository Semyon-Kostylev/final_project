import { createRouter, createWebHistory } from 'vue-router'

import PageRegistration from '@/components/pages/PageRegistration.vue'
import PageAuthorization from '@/components/pages/PageAuthorization.vue'
import PageForget from '@/components/pages/PageForget.vue'
import PageError from '@/components/pages/PageError.vue'

import PageMain from '@/components/pages/PageMain.vue'

import EditUser from '@/components/profile-edit/EditUser.vue'
import EditPassword from '@/components/profile-edit/EditPassword.vue'

import MyLikes from '@/components/section-my/MyLikes.vue'
import MyPublications from '@/components/section-my/MyPublications.vue'
import MyPublication from '@/components/section-my/MyPublication.vue'
import MyComments from '@/components/section-my/MyComments.vue'

import AllPublications from '@/components/section-all/AllPublications.vue'
import AllAuthors from '@/components/section-all/AllAuthors.vue'

const routes = [
    {
        path: '',
        name: 'registration',
        component: PageRegistration
    },
    {
        path: '/authorization',
        name: 'authorization',
        component: PageAuthorization
    },
    {
        path: '/forget-password',
        name: 'forget-password',
        component: PageForget
    },
    {
        path: '/profile',
        component: PageMain,
        children: [
            // profile
            {
                path: '/profile',
                name: 'user',
                component: EditUser
            },
            {
                path: '/password',
                name: 'password',
                component: EditPassword
            },
            // my
            {
                name: 'my-publications',
                path: '/my-publications',
                component: MyPublications
            },
            {
                name: 'publication',
                path: '/publications/:id',
                component: MyPublication
            },
            {
                name: 'my-likes',
                path: '/my-likes',
                component: MyLikes
            },
            {
                name: 'my-comments',
                path: '/my-comments',
                component: MyComments
            },
            // all
            {
                name: 'publications',
                path: '/publications',
                component: AllPublications
            },
            {
                name: 'authors',
                path: '/authors',
                component: AllAuthors
            }
        ]
    },
    {
        path: '/:pathMatch(.*)',
        component: PageError
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(to => {
    const currentUser = localStorage['currentUser'] ? true : false
    if (
        !currentUser &&
        to.name !== 'authorization' &&
        to.name !== 'forget-password' &&
        to.name !== 'registration'
    )
        return { name: 'authorization' }
    else if (currentUser) {
        if (
            to.name === 'authorization' ||
            to.name === 'forget-password' ||
            to.name === 'registration'
        )
            return { name: 'user' }
    }
})

export default router
