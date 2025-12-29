<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const props = defineProps<{
  source: string
}>()

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch {
        // ignore
      }
    }
    return hljs.highlightAuto(code).value
  }
})

const rendered = computed(() => md.render(props.source ?? ''))
</script>

<template>
  <div class="md" v-html="rendered"></div>
</template>

<style scoped>
.md :deep(h1),
.md :deep(h2),
.md :deep(h3) {
  font-family: 'Bree Serif', serif;
  margin-top: 18px;
}

.md :deep(p),
.md :deep(li) {
  line-height: 1.6;
}

.md :deep(a) {
  color: var(--site-link);
}

.md :deep(pre) {
  overflow: auto;
  padding: 12px 14px;
  border-radius: 10px;
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.md :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
}
</style>


