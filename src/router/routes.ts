import type { RouteRecordRaw } from 'vue-router'
import { getAllPosts } from '../site/content'

// Use a single dynamic route for all posts instead of generating static routes
// This is more flexible and works better with direct navigation
const postRoute: RouteRecordRaw = {
  path: 'posts/:slug',
  component: () => import('../pages/PostPage.vue'),
  props: true, // Pass route params as props
  meta: { title: 'Post' }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/HomePage.vue'), meta: { title: 'Home' } },
      { path: 'about', component: () => import('../pages/AboutPage.vue'), meta: { title: 'About' } },
      { path: 'cv', component: () => import('../pages/CvPage.vue'), meta: { title: 'CV' } },
      { path: 'CV', redirect: '/cv' },
      {
        path: 'appointments',
        component: () => import('../pages/AppointmentsPage.vue'),
        meta: { title: 'Appointments' }
      },
      {
        path: 'card',
        component: () => import('../pages/BusinessCardPage.vue'),
        meta: { title: 'Business Card' }
      },
      { path: 'posts', component: () => import('../pages/PostsIndexPage.vue'), meta: { title: 'Posts' } },
      postRoute,
      { path: ':pathMatch(.*)*', component: () => import('../pages/NotFoundPage.vue'), meta: { title: '404 Page not found' } }
    ]
  }
]

export default routes

