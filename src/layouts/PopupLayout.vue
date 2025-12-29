<script setup lang="ts">
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Sync dark mode from parent window if opened as popup
onMounted(() => {
  if (typeof window !== 'undefined' && window.opener) {
    try {
      const parentDark = window.opener.document?.body?.classList?.contains('body--dark')
      if (parentDark !== undefined) {
        $q.dark.set(parentDark)
      }
    } catch {
      // Cross-origin or other error, ignore
    }
  }
})
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="popup-page">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.popup-page {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--q-dark-page, #121418);
}

.body--light .popup-page {
  background: #ffffff;
}
</style>

