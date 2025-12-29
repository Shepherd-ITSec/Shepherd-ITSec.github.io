<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n'
import { socialLinks } from '../site/content'
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'
import { useQuasar } from 'quasar'

const { t } = useI18n()
const $q = useQuasar()

const qrCodeUrl = ref<string>('')
const mainPageUrl = 'https://www.schaefer-itsec.com/'
const cardElement = ref<any>(null)

onMounted(async () => {
  try {
    const qrDataUrl = await QRCode.toDataURL(mainPageUrl, {
      width: 200,
      margin: 2,
      color: {
        dark: '#168F8B', // Primary color
        light: '#FFFFFF'
      }
    })
    qrCodeUrl.value = qrDataUrl
  } catch (err) {
    console.error('Error generating QR code:', err)
  }
})

async function copyScreenshot() {
  if (!cardElement.value) return

  try {
    if ($q.loading) {
      $q.loading.show({
        message: t('businessCard.capturing')
      })
    }

    // Get the actual DOM element from the Quasar component
    const element = cardElement.value.$el || cardElement.value
    if (!element) {
      throw new Error('Could not find card element')
    }

    const canvas = await html2canvas(element as HTMLElement, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      logging: false
    })

    canvas.toBlob(async (blob) => {
      if (!blob) {
        if ($q.loading) $q.loading.hide()
        if ($q.notify) {
          $q.notify({
            type: 'negative',
            message: t('businessCard.screenshotError')
          })
        } else {
          alert(t('businessCard.screenshotError'))
        }
        return
      }

      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob
          })
        ])
        if ($q.loading) $q.loading.hide()
        if ($q.notify) {
          $q.notify({
            type: 'positive',
            message: t('businessCard.screenshotCopied'),
            icon: 'fa-solid fa-check'
          })
        } else {
          alert(t('businessCard.screenshotCopied'))
        }
      } catch (err) {
        // Fallback: download the image
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'shepherd-itsec-business-card.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        if ($q.loading) $q.loading.hide()
        if ($q.notify) {
          $q.notify({
            type: 'info',
            message: t('businessCard.screenshotDownloaded'),
            icon: 'fa-solid fa-download'
          })
        } else {
          alert(t('businessCard.screenshotDownloaded'))
        }
      }
    })
  } catch (err) {
    console.error('Error capturing screenshot:', err)
    if ($q.loading) $q.loading.hide()
    if ($q.notify) {
      $q.notify({
        type: 'negative',
        message: t('businessCard.screenshotError')
      })
    } else {
      alert(t('businessCard.screenshotError'))
    }
  }
}

async function shareCard() {
  const shareData = {
    title: 'Shepherd IT Sec - Digital Business Card',
    text: 'Shepherd IT Sec - Cybersecurity & AI Research',
    url: mainPageUrl
  }

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData)
    } catch (err: any) {
      // User cancelled or error occurred
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err)
      }
    }
  } else {
    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(mainPageUrl)
      if ($q.notify) {
        $q.notify({
          type: 'info',
          message: t('businessCard.urlCopied'),
          icon: 'fa-solid fa-link'
        })
      } else {
        alert(t('businessCard.urlCopied'))
      }
    } catch (err) {
      console.error('Error copying URL:', err)
    }
  }
}
</script>

<template>
  <div class="business-card-page">
    <div class="business-card-container">
      <q-card ref="cardElement" flat bordered class="business-card glass-modern">
        <q-card-section class="business-card-content">
          <div class="card-layout">
            <!-- Left Column: Contact Info -->
            <div class="card-left">
              <!-- Logo and Company Name -->
              <div class="card-header">
                <img src="/logo.png" alt="Shepherd IT Sec" class="card-logo" />
                <h2 class="card-company-name">{{ t('site.name') }}</h2>
                <p class="card-tagline">{{ t('site.tagline') }}</p>
              </div>

              <q-separator class="q-my-md" color="grey-8" />

              <!-- Contact Information -->
              <div class="card-contact">
                <div class="contact-item q-mb-sm">
                  <q-icon name="fa-solid fa-user" size="sm" color="primary" class="q-mr-sm" />
                  <div>
                    <div class="text-caption text-muted">{{ t('businessCard.name') }}</div>
                    <div class="text-body2">Felix Schäfer</div>
                  </div>
                </div>

                <div class="contact-item q-mb-sm">
                  <q-icon name="fa-solid fa-envelope" size="sm" color="primary" class="q-mr-sm" />
                  <div>
                    <div class="text-caption text-muted">{{ t('businessCard.email') }}</div>
                    <div class="text-body2">
                      <a href="mailto:felix@shepherd-itsec.com" class="contact-link">
                        felix@shepherd-itsec.com
                      </a>
                    </div>
                  </div>
                </div>

                <div class="contact-item q-mb-sm">
                  <q-icon name="fa-solid fa-globe" size="sm" color="primary" class="q-mr-sm" />
                  <div>
                    <div class="text-caption text-muted">{{ t('businessCard.website') }}</div>
                    <div class="text-body2">
                      <a href="https://www.schaefer-itsec.com" target="_blank" rel="noopener" class="contact-link">
                        www.schaefer-itsec.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <q-separator class="q-my-md" color="grey-8" />

              <!-- Social Links -->
              <div class="card-social">
                <div class="text-caption text-muted q-mb-xs">{{ t('businessCard.connect') }}</div>
                <div class="social-buttons row q-gutter-xs">
                  <q-btn
                    v-for="link in socialLinks"
                    :key="link.label"
                    flat
                    round
                    :icon="link.icon"
                    :href="link.href"
                    target="_blank"
                    rel="noopener"
                    :aria-label="link.label"
                    :title="link.label"
                    color="primary"
                    size="sm"
                    class="social-btn"
                  />
                </div>
              </div>
            </div>

            <!-- Right Column: QR Code -->
            <div class="card-right">
              <div class="qr-section">
                <div class="text-caption text-muted q-mb-sm">{{ t('businessCard.scanQR') }}</div>
                <div class="qr-code-container">
                  <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code" class="qr-code" />
                  <q-spinner v-else color="primary" size="3rem" />
                </div>
                <div class="text-caption text-muted q-mt-sm">{{ t('businessCard.scanHint') }}</div>
              </div>

              <!-- Action Buttons -->
              <div class="card-actions">
                <q-btn
                  outline
                  color="primary"
                  :icon="'fa-solid fa-share-nodes'"
                  :label="t('businessCard.share')"
                  @click="shareCard"
                  size="sm"
                  class="action-btn"
                />
                <q-btn
                  outline
                  color="primary"
                  :icon="'fa-solid fa-copy'"
                  :label="t('businessCard.copyCard')"
                  @click="copyScreenshot"
                  size="sm"
                  class="action-btn"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.business-card-page {
  min-height: calc(100vh - 64px - 60px); /* Full viewport minus header (~64px) and footer (~60px) */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  overflow-y: auto;
}

.business-card-container {
  width: 100%;
  max-width: 900px;
  min-height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
}

.business-card {
  border-radius: 24px;
  width: 100%;
  min-height: fit-content;
  max-height: calc(100vh - 64px - 60px - 32px); /* Account for padding */
  display: flex;
  flex-direction: column;
}

.business-card-content {
  flex: 1;
  display: flex;
  padding: 2rem !important;
  overflow: visible;
  min-height: fit-content;
}

.card-layout {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  width: 100%;
  min-height: fit-content;
  align-items: flex-start;
}

.card-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;
  min-height: fit-content;
}

.card-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  padding-left: 2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  min-height: fit-content;
  flex-shrink: 0;
}

.body--light .card-right {
  border-left-color: rgba(0, 0, 0, 0.15);
}

.card-header {
  text-align: center;
  margin-bottom: 1rem;
}

.card-logo {
  height: 100px;
  width: auto;
  object-fit: contain;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.card-company-name {
  font-family: 'Bree Serif', serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.25rem 0;
  color: var(--q-primary);
}

.card-tagline {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.body--light .card-tagline {
  color: rgba(0, 0, 0, 0.6);
}

.card-contact {
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: fit-content;
}

.contact-item {
  display: flex;
  align-items: flex-start;
}

.contact-link {
  color: var(--q-primary);
  text-decoration: none;
  transition: color 0.2s ease;
  word-break: break-word;
}

.contact-link:hover {
  color: var(--q-secondary);
  text-decoration: underline;
}

.card-social {
  text-align: center;
}

.social-buttons {
  justify-content: center;
}

.social-btn {
  transition: all 0.2s ease;
}

.social-btn:hover {
  transform: scale(1.1);
  background: rgba(22, 143, 139, 0.1);
}

.qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.qr-code-container {
  padding: 1rem;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.qr-code {
  width: 180px;
  height: 180px;
  display: block;
}

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.action-btn {
  width: 100%;
}

/* glass-modern styles are now in app.scss */

@media (max-width: 768px) {
  .business-card-page {
    min-height: calc(100vh - 64px - 60px);
    padding: 8px;
    overflow-y: auto;
  }

  .business-card-container {
    min-height: fit-content;
  }

  .business-card {
    max-height: none;
    min-height: fit-content;
  }

  .business-card-content {
    padding: 1.5rem !important;
    overflow: visible;
    min-height: fit-content;
  }

  .card-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    min-height: fit-content;
    align-items: flex-start;
  }

  .card-left {
    min-height: fit-content;
  }

  .card-right {
    padding-left: 0;
    padding-top: 1.5rem;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    min-height: fit-content;
    flex-shrink: 0;
    width: 100%;
  }

  .body--light .card-right {
    border-top-color: rgba(0, 0, 0, 0.15);
    border-left: none;
  }

  .card-company-name {
    font-size: 1.25rem;
  }

  .card-logo {
    height: 80px;
  }

  .qr-code-container {
    padding: 0.75rem;
  }

  .qr-code {
    width: 150px;
    height: 150px;
  }

  .card-actions {
    flex-direction: row;
    width: 100%;
  }

  .action-btn {
    flex: 1;
  }
}

@media (max-width: 480px) {
  .business-card-content {
    padding: 1rem !important;
  }

  .card-layout {
    gap: 1rem;
  }

  .qr-code-container {
    padding: 0.5rem;
  }

  .qr-code {
    width: 120px;
    height: 120px;
  }
}
</style>

