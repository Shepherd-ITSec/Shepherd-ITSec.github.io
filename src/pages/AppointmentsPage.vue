<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <h1 class="page-title">{{ t('appointments.title') }}</h1>

  <p>{{ t('appointments.content') }}</p>

  <p class="q-mt-md">
    <a href="http://schaefer-itsec.com/appointment" target="_blank" rel="noopener">
      {{ t('appointments.linkText') }}
    </a>
  </p>
</template>

<style scoped>
a {
  color: var(--site-link);
}
</style>


