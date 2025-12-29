<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownView from '../components/MarkdownView.vue'
import { getPostBySlug } from '../site/content'

const props = defineProps<{ slug?: string }>()
const route = useRoute()

const slug = computed(() => props.slug ?? String(route.params.slug ?? ''))
const post = computed(() => (slug.value ? getPostBySlug(slug.value) : null))

function formatDate(date?: string) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div v-if="!post">
    <h1 class="page-title">Post not found</h1>
    <p>
      <router-link to="/posts">Back to posts</router-link>
    </p>
  </div>

  <article v-else>
    <h1 class="page-title">{{ post.title }}</h1>

    <div v-if="post.date" class="post-date">Published on {{ formatDate(post.date) }}</div>

    <div v-if="post.tags.length" class="q-mt-sm q-gutter-xs">
      <q-chip
        v-for="t in post.tags"
        :key="t"
        dense
        outline
        color="grey-6"
        text-color="primary"
      >
        {{ t }}
      </q-chip>
    </div>

    <div class="q-mt-md">
      <MarkdownView :source="post.body" />
    </div>
  </article>
</template>

<style scoped>
.page-title {
  font-family: 'Bree Serif', serif;
  margin: 0 0 10px;
}

.post-date {
  opacity: 0.85;
}

a {
  color: var(--site-link);
}
</style>


