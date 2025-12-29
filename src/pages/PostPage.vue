<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownView from '../components/MarkdownView.vue'
import { getPostBySlug } from '../site/content'
import { useI18n } from '../composables/useI18n'

const props = defineProps<{ slug?: string }>()
const route = useRoute()
const { t, locale } = useI18n()

const slug = computed(() => props.slug ?? String(route.params.slug ?? ''))
const post = computed(() => (slug.value ? getPostBySlug(slug.value) : null))

function formatDate(date?: string) {
  if (!date) return ''
  const d = new Date(date)
  const lang = locale.value === 'de-DE' ? 'de-DE' : 'en-US'
  return d.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div v-if="!post">
    <h1 class="page-title">{{ t('posts.notFound') }}</h1>
    <p>
      <router-link to="/posts">{{ t('posts.backToPosts') }}</router-link>
    </p>
  </div>

  <div v-else>
    <div class="q-mb-md">
      <q-btn flat color="primary" icon="fa-solid fa-arrow-left" :label="t('posts.backToPosts')" to="/posts" />
    </div>

    <q-card flat bordered class="glass">
      <q-card-section>
        <div class="text-overline text-muted">Post</div>
        <h1 class="page-title q-mt-sm q-mb-sm">{{ post.title }}</h1>
        <div v-if="post.date" class="text-caption text-muted">
          {{ t('posts.publishedOn') }} {{ formatDate(post.date) }}
        </div>

        <div v-if="post.tags.length" class="q-mt-sm q-gutter-xs">
          <q-chip
            v-for="t in post.tags"
            :key="t"
            dense
            outline
            color="grey-7"
            text-color="primary"
          >
            {{ t }}
          </q-chip>
        </div>
      </q-card-section>

      <q-separator color="grey-8" />

      <q-card-section>
        <MarkdownView :source="post.body" />
      </q-card-section>
    </q-card>
  </div>
</template>



