import { route } from 'quasar/wrappers'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { getPostBySlug } from '../site/content'

export default route(function () {
  const createHistory = process.env.SERVER ? createMemoryHistory : createWebHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.afterEach((to) => {
    let title = typeof to.meta?.title === 'string' ? to.meta.title : 'Shepherd IT Sec'
    
    // For post pages, try to get the post title
    if (to.path.startsWith('/posts/') && to.params.slug) {
      const post = getPostBySlug(String(to.params.slug))
      if (post) {
        title = `${post.title} - Shepherd IT Sec`
      }
    }
    document.title = title
  })

  return Router
})


