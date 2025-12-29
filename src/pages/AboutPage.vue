<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <div class="about-container">
    <div class="about-header q-mb-xl">
      <q-chip color="primary" text-color="white" size="md" class="q-mb-md">
        <q-icon name="fa-solid fa-user" class="q-mr-xs" />
        {{ t('nav.about') }}
      </q-chip>
      <div class="about-title-section">
        <img src="/logo.png" alt="Shepherd IT Sec" class="about-logo-inline" />
        <h1 class="page-title q-mt-sm q-mb-md">{{ t('about.title') }}</h1>
      </div>
      <p class="text-h6 text-muted">{{ t('about.subtitle') }}</p>
    </div>

    <div class="row q-col-gutter-lg">
      <!-- Main Content Card -->
      <div class="col-12 col-lg-8">
        <q-card flat bordered class="glass-modern about-content-card q-pa-xl">
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

      <!-- Info Card -->
      <div class="col-12 col-lg-4">
        <q-card flat bordered class="glass-modern info-card q-pa-lg">
          <div class="info-section">
            <q-icon name="fa-solid fa-shield-halved" size="2rem" color="primary" class="q-mb-md" />
            <h3 class="info-title q-mb-sm">{{ t('about.infoTitle') }}</h3>
            <p class="text-body2 text-muted">{{ t('about.infoText') }}</p>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.about-header {
  text-align: center;
}

.about-title-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.about-logo-inline {
  height: 80px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.about-content-card {
  min-height: 400px;
  border-radius: 20px;
}

.about-content {
  width: 100%;
}

/* glass-modern styles are now in app.scss */

.info-card {
  height: 100%;
  border-radius: 20px;
}

.info-section {
  text-align: center;
}

.info-title {
  font-family: 'Bree Serif', serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.maintenance-notice {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(22, 143, 139, 0.15);
  border-radius: 12px;
  border-left: 3px solid var(--q-primary);
}

@media (max-width: 600px) {
  .about-title-section {
    flex-direction: column;
    gap: 1rem;
  }

  .about-logo-inline {
    height: 60px;
  }
}
</style>



