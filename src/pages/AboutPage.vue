<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <div class="about-container">
    <q-card flat bordered class="glass-modern q-pa-xl">
      <div class="about-header q-mb-lg">
        <div class="about-logo-container q-mb-md">
          <img src="/logo.png" alt="Shepherd IT Sec" class="about-logo" />
        </div>
        <q-chip color="primary" text-color="white" size="md" class="q-mb-md">
          <q-icon name="fa-solid fa-user" class="q-mr-xs" />
          {{ t('nav.about') }}
        </q-chip>
        <h1 class="page-title q-mt-sm q-mb-md">{{ t('about.title') }}</h1>
      </div>

      <div class="about-content">
        <p class="lead q-mb-lg">
          {{ t('about.content') }}
        </p>

        <q-separator class="q-my-lg" color="grey-8" />

        <div class="maintenance-notice">
          <q-icon name="fa-solid fa-tools" size="md" color="primary" class="q-mr-sm" />
          <p class="text-body2 text-muted q-mb-none">
            {{ t('about.maintenance') }}
          </p>
        </div>
      </div>
    </q-card>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 0 auto;
}

.glass-modern {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.about-logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.about-logo {
  height: 120px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.maintenance-notice {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(22, 143, 139, 0.15);
  border-radius: 12px;
  border-left: 3px solid var(--q-primary);
}
</style>



