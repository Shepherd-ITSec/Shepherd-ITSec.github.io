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
  margin-top: 20px;
  margin-bottom: 10px;
}

.md :deep(p),
.md :deep(li) {
  line-height: 1.6;
}

.md :deep(a) {
  color: var(--q-primary);
  text-decoration: none;
}

.md :deep(a:hover) {
  text-decoration: underline;
}

.md :deep(blockquote) {
  margin: 14px 0;
  padding: 10px 14px;
  border-left: 3px solid var(--q-primary);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
}

.md :deep(pre) {
  overflow: auto;
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.md :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
}

.md :deep(hr) {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  margin: 18px 0;
}
</style>


