<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

function downloadCV() {
  const link = document.createElement('a')
  link.href = '/cv.pdf'
  link.download = 'Felix_Schaefer_CV.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="cv-container">
    <div class="cv-header q-mb-xl">
      <q-chip color="primary" text-color="white" size="md" class="q-mb-md">
        <q-icon name="fa-solid fa-file-pdf" class="q-mr-xs" />
        {{ t('nav.cv') }}
      </q-chip>
      <h1 class="page-title q-mt-sm q-mb-md">{{ t('cv.title') }}</h1>
      <p class="text-h6 text-muted">{{ t('cv.description') }}</p>
    </div>

    <div class="row q-col-gutter-lg">
      <!-- CV Viewer Card -->
      <div class="col-12 col-lg-9">
        <q-card flat bordered class="glass-modern cv-viewer-card">
          <q-card-section class="q-pa-none">
            <iframe
              src="/cv.pdf#toolbar=1&navpanes=1&scrollbar=1"
              class="cv-pdf-viewer"
              title="Curriculum Vitae"
            />
          </q-card-section>
        </q-card>
      </div>

      <!-- Download Card -->
      <div class="col-12 col-lg-3">
        <q-card flat bordered class="glass-modern download-card q-pa-lg">
          <div class="download-content">
            <div class="download-icon q-mb-md">
              <q-icon name="fa-solid fa-download" size="3rem" color="primary" />
            </div>
            <h3 class="download-title q-mb-sm">{{ t('cv.downloadTitle') }}</h3>
            <p class="text-body2 text-muted q-mb-lg">
              {{ t('cv.downloadDescription') }}
            </p>
            <q-btn
              color="primary"
              unelevated
              size="lg"
              :icon="'fa-solid fa-download'"
              :label="t('cv.download')"
              @click="downloadCV"
              class="download-btn-full"
            />
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cv-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.cv-header {
  text-align: center;
}

.cv-viewer-card {
  min-height: 600px;
  overflow: hidden;
  border-radius: 20px;
}

.cv-pdf-viewer {
  width: 100%;
  height: 80vh;
  min-height: 600px;
  border: none;
  display: block;
  border-radius: 20px;
}

.download-card {
  height: 100%;
  border-radius: 20px;
  display: flex;
  align-items: center;
}

.download-content {
  width: 100%;
  text-align: center;
}

.download-icon {
  display: inline-block;
  padding: 1.5rem;
  background: rgba(22, 143, 139, 0.15);
  border-radius: 16px;
}

.download-title {
  font-family: 'Bree Serif', serif;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.download-btn-full {
  width: 100%;
  padding: 12px 24px;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.download-btn-full:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.glass-modern {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.glass-modern:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

@media (max-width: 1024px) {
  .download-card {
    margin-top: 1.5rem;
  }
}

@media (max-width: 600px) {
  .cv-pdf-viewer {
    height: 70vh;
    min-height: 500px;
  }
}
</style>



