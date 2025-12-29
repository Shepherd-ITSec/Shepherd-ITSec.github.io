<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { navItems, socialLinks } from '../site/content'
import { useI18n } from '../composables/useI18n'

const $q = useQuasar()
const route = useRoute()
const { t, locale, setLocale } = useI18n()

const drawerOpen = ref(false)

const isDark = computed({
  get: () => $q.dark.isActive,
  set: (v: boolean) => $q.dark.set(v)
})

const internalNav = computed(() => navItems.filter((i) => i.kind === 'route'))
const externalNav = computed(() => navItems.filter((i) => i.kind === 'external'))

const activeTab = computed(() => route.path)

const currentYear = computed(() => new Date().getFullYear())

function toggleLocale() {
  setLocale(locale.value === 'en-US' ? 'de-DE' : 'en-US')
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="app-header">
      <q-toolbar class="app-toolbar">
        <q-btn
          flat
          round
          dense
          class="lt-md"
          icon="fa-solid fa-bars"
          aria-label="Menu"
          @click="drawerOpen = !drawerOpen"
        />

        <router-link to="/" class="app-logo-link">
          <img src="/logo.png" alt="Shepherd IT Sec" class="app-logo" />
        </router-link>

        <q-toolbar-title class="app-title">
          <router-link to="/" class="app-title-link">{{ t('site.name') }}</router-link>
        </q-toolbar-title>

        <q-tabs
          v-model="activeTab"
          class="gt-sm"
          dense
          shrink
          inline-label
          indicator-color="primary"
          active-color="primary"
        >
          <q-route-tab
            v-for="item in internalNav"
            :key="item.to"
            :name="item.to"
            :to="item.to"
            :label="t(`nav.${item.to === '/' ? 'home' : item.to.slice(1)}`)"
          />
        </q-tabs>

        <div class="row items-center q-ml-sm q-gutter-xs">
          <q-btn
            flat
            round
            dense
            :icon="locale === 'en-US' ? 'fa-solid fa-language' : 'fa-solid fa-language'"
            :label="locale === 'en-US' ? 'EN' : 'DE'"
            :aria-label="locale === 'en-US' ? 'Switch to German' : 'Switch to English'"
            @click="toggleLocale"
            class="lang-switcher"
          />
          <q-btn
            flat
            round
            dense
            :icon="isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"
            :aria-label="isDark ? 'Disable dark mode' : 'Enable dark mode'"
            @click="isDark = !isDark"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerOpen"
      side="left"
      overlay
      bordered
      class="app-drawer"
    >
      <q-list padding>
        <q-item-label header class="drawer-header">Navigation</q-item-label>

        <q-item
          v-for="item in internalNav"
          :key="item.to"
          clickable
          v-ripple
          :to="item.to"
          @click="drawerOpen = false"
        >
          <q-item-section>{{ t(`nav.${item.to === '/' ? 'home' : item.to.slice(1)}`) }}</q-item-section>
        </q-item>

        <q-separator class="q-my-sm" />

        <q-item
          v-for="item in externalNav"
          :key="item.label"
          clickable
          v-ripple
          :href="item.href"
          target="_blank"
          rel="noopener"
          @click="drawerOpen = false"
        >
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="page-wrap">
        <div class="page-inner">
          <router-view />
        </div>
      </q-page>
    </q-page-container>

    <q-footer class="app-footer">
      <div class="page-inner footer-inner q-py-md row items-center justify-between q-gutter-sm">
        <div class="text-caption text-muted">{{ t('footer.copyright', { year: currentYear }) }}</div>
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
          color="primary"
        />
      </div>
    </q-footer>
  </q-layout>
</template>

<style scoped>
.app-toolbar {
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
}

.app-header {
  background: rgba(18, 20, 24, 0.85);
  backdrop-filter: blur(10px);
}

.app-title {
  font-family: 'Bree Serif', serif;
  letter-spacing: 0.2px;
}

.app-logo-link {
  display: flex;
  align-items: center;
  margin-right: 12px;
  text-decoration: none;
}

.app-logo {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.app-title-link {
  color: inherit;
  text-decoration: none;
}

.lang-switcher {
  min-width: 48px;
}

.app-drawer {
  background: rgba(18, 20, 24, 0.98);
}

.drawer-header {
  opacity: 0.85;
}

.page-wrap {
  padding: 28px 16px;
}

.page-inner {
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  background: rgba(18, 20, 24, 0.92);
}
</style>


