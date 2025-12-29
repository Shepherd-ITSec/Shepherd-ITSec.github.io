<script setup lang="ts">
import { navItems, socialLinks } from '../site/content'
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-dark text-primary">
      <q-toolbar class="site-toolbar">
        <q-toolbar-title class="site-title">
          <router-link to="/" class="site-title-link">Felix Schäfer</router-link>
        </q-toolbar-title>

        <div class="gt-sm row items-center q-gutter-sm">
          <template v-for="item in navItems" :key="item.label">
            <q-btn
              v-if="item.kind === 'route'"
              flat
              dense
              :to="item.to"
              class="text-primary"
            >
              {{ item.label }}
            </q-btn>
            <q-btn
              v-else
              flat
              dense
              :href="item.href"
              target="_blank"
              rel="noopener"
              class="text-primary"
            >
              {{ item.label }}
            </q-btn>
          </template>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="page-wrap">
        <div class="page-inner">
          <router-view />
        </div>
      </q-page>
    </q-page-container>

    <q-footer class="bg-dark text-primary">
      <div class="page-inner footer-inner q-py-md row items-center justify-center q-gutter-sm">
        <q-btn
          v-for="link in socialLinks"
          :key="link.label"
          flat
          round
          :icon="link.icon"
          :href="link.href"
          target="_blank"
          rel="noopener"
          :aria-label="link.label"
          :title="link.label"
          class="text-primary"
        />
      </div>
    </q-footer>
  </q-layout>
</template>

<style scoped>
.site-toolbar {
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
}

.site-title {
  font-family: 'Bree Serif', serif;
  letter-spacing: 0.2px;
}

.site-title-link {
  color: inherit;
  text-decoration: none;
}

.page-wrap {
  padding: 28px 16px;
}

.page-inner {
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
}
</style>


