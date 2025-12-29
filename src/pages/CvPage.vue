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



