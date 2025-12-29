<script setup lang="ts">
import MarkdownView from '../components/MarkdownView.vue'
import { getPageByPath } from '../site/content'

const page = getPageByPath('/content/_index.md')
</script>

<template>
  <div class="row items-start q-col-gutter-xl">
    <div class="col-12 col-md">
      <MarkdownView :source="page.body" />
    </div>

    <div class="col-12 col-md-auto">
      <div class="profile-wrap">
        <img class="profile-img" src="/about/profile.jpg" alt="Profile photo" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-wrap {
  display: flex;
  justify-content: center;
}

.profile-img {
  max-width: 240px;
  width: 100%;
  height: auto;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>


