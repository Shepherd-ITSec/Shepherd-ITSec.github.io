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
  <div class="markdown-content" v-html="rendered"></div>
</template>

<style scoped>
.markdown-content {
  display: block;
  min-width: 0;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  font-family: 'Bree Serif', serif;
  margin-top: 20px;
  margin-bottom: 10px;
}

.markdown-content :deep(p),
.markdown-content :deep(li) {
  line-height: 1.6;
}

.markdown-content :deep(a) {
  color: var(--q-primary);
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(blockquote) {
  margin: 14px 0;
  padding: 10px 14px;
  border-left: 3px solid var(--q-primary);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
}

.body--light .markdown-content :deep(blockquote) {
  background: rgba(0, 0, 0, 0.03);
}

.markdown-content :deep(pre) {
  overflow: auto;
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.body--light .markdown-content :deep(pre) {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.markdown-content :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
    'Courier New', monospace;
}

.markdown-content :deep(iframe) {
  display: block;
  width: 100%;
  max-width: 100%;
}

.markdown-content :deep(hr) {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  margin: 18px 0;
}

.body--light .markdown-content :deep(hr) {
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}
</style>


