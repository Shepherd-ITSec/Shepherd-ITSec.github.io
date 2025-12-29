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
    <q-card flat bordered class="glass q-pa-lg q-mb-md">
      <div class="row items-center justify-between q-mb-md">
        <div>
          <div class="text-overline text-muted">{{ t('nav.cv') }}</div>
          <h1 class="page-title q-mt-sm q-mb-none">{{ t('cv.title') }}</h1>
        </div>
        <q-btn
          color="primary"
          unelevated
          :icon="'fa-solid fa-download'"
          :label="t('cv.download')"
          @click="downloadCV"
          class="download-btn"
        />
      </div>
      <p class="text-body2 text-muted q-mb-none">
        {{ t('cv.description') }}
      </p>
    </q-card>

    <q-card flat bordered class="glass cv-viewer-card">
      <q-card-section class="q-pa-none">
        <iframe
          src="/cv.pdf#toolbar=1&navpanes=1&scrollbar=1"
          class="cv-pdf-viewer"
          title="Curriculum Vitae"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.cv-container {
  max-width: 100%;
}

.cv-viewer-card {
  min-height: 600px;
  overflow: hidden;
}

.cv-pdf-viewer {
  width: 100%;
  height: 80vh;
  min-height: 600px;
  border: none;
  display: block;
}

.download-btn {
  min-width: 140px;
}

@media (max-width: 600px) {
  .cv-pdf-viewer {
    height: 70vh;
    min-height: 500px;
  }

  .download-btn {
    width: 100%;
    margin-top: 12px;
  }
}
</style>



