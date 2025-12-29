<script setup lang="ts">
import { getAllPosts } from '../site/content'
import { useI18n } from '../composables/useI18n'

const { t, locale } = useI18n()
const posts = getAllPosts()

function formatDate(date?: string) {
  if (!date) return ''
  const d = new Date(date)
  const lang = locale.value === 'de-DE' ? 'de-DE' : 'en-US'
  return d.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })
}

function excerpt(body: string): string {
  const firstParagraph = body.split(/\n\s*\n/).find((p) => p.trim().length > 0) ?? ''
  return firstParagraph.replace(/^#+\s+/gm, '').trim()
}
</script>

<template>
  <div class="posts-container">
    <div class="posts-header q-mb-xl">
      <q-chip color="primary" text-color="white" size="md" class="q-mb-md">
        <q-icon name="fa-solid fa-book" class="q-mr-xs" />
        Blog
      </q-chip>
      <h1 class="page-title q-mt-sm q-mb-none">{{ t('posts.title') }}</h1>
    </div>

  <div v-if="posts.length === 0">
    <p>{{ t('posts.noPosts') }}</p>
  </div>

  <div v-else class="posts-grid q-gutter-md">
    <q-card
      v-for="post in posts"
      :key="post.slug"
      flat
      bordered
      class="post-card glass"
      v-ripple
    >
      <q-card-section>
        <div class="row items-start justify-between q-col-gutter-md">
          <div class="col-12 col-sm">
            <div v-if="post.date" class="text-caption text-muted">
              {{ t('posts.publishedOn') }} {{ formatDate(post.date) }}
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
              :label="t('posts.continueReading')"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
  </div>
</template>

<style scoped>
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

.posts-container {
  max-width: 1000px;
  margin: 0 auto;
}

.posts-header {
  text-align: center;
}

.post-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  border-color: var(--q-primary);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 600px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>


