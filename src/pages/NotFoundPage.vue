<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <q-chip color="primary" text-color="white" size="md" class="q-mb-md">
        <q-icon name="fa-solid fa-exclamation-triangle" class="q-mr-xs" />
        {{ t('notFound.badge') }}
      </q-chip>
      <h1 class="page-title q-mt-sm q-mb-md">{{ t('notFound.title') }}</h1>
      <p class="text-h6 text-muted q-mb-xl">{{ t('notFound.message') }}</p>
      
      <div class="not-found-actions">
        <q-btn
          color="primary"
          unelevated
          size="lg"
          :label="t('notFound.homeButton')"
          to="/"
          icon="fa-solid fa-home"
          class="q-mr-md"
        />
        <q-btn
          outline
          color="primary"
          size="lg"
          :label="t('notFound.backButton')"
          @click="$router.go(-1)"
          icon="fa-solid fa-arrow-left"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 16px;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  text-align: center;
  width: 100%;
}

.not-found-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 600px) {
  .not-found-actions {
    flex-direction: column;
  }

  .not-found-actions .q-btn {
    width: 100%;
  }
}
</style>


