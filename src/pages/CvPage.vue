<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <q-card flat bordered class="glass q-pa-lg">
    <div class="text-overline text-muted">{{ t('nav.cv') }}</div>
    <h1 class="page-title q-mt-sm q-mb-md">{{ t('cv.title') }}</h1>

    <p class="lead q-mb-none">
      {{ t('cv.content') }}
    </p>
  </q-card>
</template>

<style scoped>
.page-title {
  font-family: 'Bree Serif', serif;
  margin: 0 0 10px;
}

.lead {
  line-height: 1.6;
}

.glass {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
  border-radius: 14px;
}
</style>


