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
  <div class="row items-end justify-between q-col-gutter-md q-mb-md">
    <div class="col-12 col-sm">
      <div class="text-overline text-muted">Blog</div>
      <h1 class="page-title q-mt-sm q-mb-none">Posts</h1>
    </div>
  </div>

  <div v-if="posts.length === 0">
    <p>No posts yet.</p>
  </div>

  <div v-else class="q-gutter-md">
    <q-card
      v-for="post in posts"
      :key="post.slug"
      flat
      bordered
      class="glass"
    >
      <q-card-section>
        <div class="row items-start justify-between q-col-gutter-md">
          <div class="col-12 col-sm">
            <div v-if="post.date" class="text-caption text-muted">
              Published on {{ formatDate(post.date) }}
            </div>
            <h2 class="post-title q-mt-xs q-mb-sm">
              <router-link :to="`/posts/${post.slug}`">{{ post.title }}</router-link>
            </h2>
            <p class="post-excerpt q-mb-none">
              {{ excerpt(post.body) }}
            </p>
          </div>
          <div class="col-12 col-sm-auto">
            <q-btn
              color="primary"
              unelevated
              :to="`/posts/${post.slug}`"
              label="Read"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
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

.post-excerpt {
  margin: 0;
}

.glass {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
  border-radius: 14px;
}
</style>


