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

  <div v-else class="posts-grid">
    <q-card
      v-for="post in posts"
      :key="post.slug"
      flat
      bordered
      class="post-card glass"
      v-ripple
      @click="$router.push(`/posts/${post.slug}`)"
    >
      <q-card-section class="post-card-content">
        <div v-if="post.date" class="text-caption text-muted q-mb-xs">
          {{ t('posts.publishedOn') }} {{ formatDate(post.date) }}
        </div>
        <h2 class="post-title q-mt-sm q-mb-md">
          <router-link :to="`/posts/${post.slug}`" class="post-title-link">{{ post.title }}</router-link>
        </h2>
        <p class="post-excerpt q-mb-md">
          {{ excerpt(post.body) }}
        </p>
        <q-btn
          color="primary"
          unelevated
          :to="`/posts/${post.slug}`"
          :label="t('posts.continueReading')"
          icon="fa-solid fa-arrow-right"
          class="post-read-btn"
          @click.stop
        />
      </q-card-section>
    </q-card>
  </div>
  </div>
</template>

<style scoped>
.posts-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.posts-header {
  text-align: center;
  margin-bottom: 3rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.post-card {
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
}

.post-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25);
  border-color: var(--q-primary);
}

.post-card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
}

.post-title {
  font-family: 'Bree Serif', serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
}

.post-title-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-title-link:hover {
  color: var(--q-primary);
  text-decoration: none;
}

.post-excerpt {
  flex-grow: 1;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.body--light .post-excerpt {
  color: rgba(0, 0, 0, 0.7);
}

.post-read-btn {
  margin-top: auto;
  align-self: flex-start;
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .post-card-content {
    padding: 1.25rem;
  }
}
</style>


