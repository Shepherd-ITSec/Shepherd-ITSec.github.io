import type { RouteRecordRaw } from 'vue-router'
import { getAllPosts } from '../site/content'

const postRoutes: RouteRecordRaw[] = getAllPosts().map((post) => ({
  path: `/posts/${post.slug}`,
  component: () => import('../pages/PostPage.vue'),
  props: { slug: post.slug },
  meta: { title: post.title }
}))

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
      { path: 'posts', component: () => import('../pages/PostsIndexPage.vue'), meta: { title: 'Posts' } },
      ...postRoutes,
      { path: ':pathMatch(.*)*', component: () => import('../pages/NotFoundPage.vue'), meta: { title: '404 Page not found' } }
    ]
  }
]

export default routes

