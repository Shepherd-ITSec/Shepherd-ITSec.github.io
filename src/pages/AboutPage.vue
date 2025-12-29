<script setup lang="ts">
import MarkdownView from '../components/MarkdownView.vue'
import { getPageByPath } from '../site/content'

const page = getPageByPath('/content/about/index.md')
</script>

<template>
  <h1 class="page-title">{{ page.title }}</h1>
  <MarkdownView :source="page.body" />
</template>

<style scoped>
.page-title {
  font-family: 'Bree Serif', serif;
  margin: 0 0 10px;
}
</style>


