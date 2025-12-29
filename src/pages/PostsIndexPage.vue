<script setup lang="ts">
import { getAllPosts } from '../site/content'

const posts = getAllPosts()

function formatDate(date?: string) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

function excerpt(body: string): string {
  const firstParagraph = body.split(/\n\s*\n/).find((p) => p.trim().length > 0) ?? ''
  return firstParagraph.replace(/^#+\s+/gm, '').trim()
}
</script>

<template>
  <h1 class="page-title">Posts</h1>

  <div v-if="posts.length === 0">
    <p>No posts yet.</p>
  </div>

  <div v-else class="q-gutter-lg">
    <article v-for="post in posts" :key="post.slug" class="post-card">
      <h2 class="post-title">
        <router-link :to="`/posts/${post.slug}`">{{ post.title }}</router-link>
      </h2>

      <div v-if="post.date" class="post-date">Published on {{ formatDate(post.date) }}</div>

      <p class="post-excerpt">
        {{ excerpt(post.body) }}
      </p>

      <div class="q-mt-sm">
        <router-link :to="`/posts/${post.slug}`">Continue reading...</router-link>
      </div>

      <q-separator class="q-mt-lg" color="grey-8" />
    </article>
  </div>
</template>

<style scoped>
.page-title {
  font-family: 'Bree Serif', serif;
  margin: 0 0 10px;
}

.post-title {
  font-family: 'Bree Serif', serif;
  margin: 0 0 4px;
}

.post-title a {
  color: inherit;
  text-decoration: none;
}

.post-title a:hover {
  text-decoration: underline;
}

.post-date {
  opacity: 0.85;
  margin-bottom: 10px;
}

.post-excerpt {
  margin: 0;
}

a {
  color: var(--site-link);
}
</style>


