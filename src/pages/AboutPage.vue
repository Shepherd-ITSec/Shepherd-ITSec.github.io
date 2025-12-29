<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <q-card flat bordered class="glass q-pa-lg">
    <div class="text-overline text-muted">{{ t('nav.about') }}</div>
    <h1 class="page-title q-mt-sm q-mb-md">{{ t('about.title') }}</h1>

    <p class="lead">
      {{ t('about.content') }}
    </p>

    <q-separator class="q-my-md" color="grey-8" />

    <p class="text-caption text-muted q-mb-none">
      {{ t('about.maintenance') }}
    </p>
  </q-card>
</template>



