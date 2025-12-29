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

const NOTIFICATION_TIMEOUT = 2000

// Helper functions
function showNotification(type: 'positive' | 'negative' | 'info', message: string, icon?: string) {
  if ($q.notify) {
    $q.notify({ type, message, icon, timeout: NOTIFICATION_TIMEOUT })
  } else {
    alert(message)
  }
}

function hideLoading() {
  if ($q.loading) $q.loading.hide()
}

const contactItems = [
  { icon: 'fa-solid fa-user', label: 'businessCard.name', value: 'Felix Schäfer' },
  {
    icon: 'fa-solid fa-envelope',
    label: 'businessCard.email',
    value: 'felix@shepherd-itsec.com',
    href: 'mailto:felix@shepherd-itsec.com'
  },
  {
    icon: 'fa-solid fa-globe',
    label: 'businessCard.website',
    value: 'www.schaefer-itsec.com',
    href: 'https://www.schaefer-itsec.com',
    external: true
  }
]

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
      $q.loading.show({ message: t('businessCard.capturing') })
    }

    const element = cardElement.value.$el || cardElement.value
    if (!element) throw new Error('Could not find card element')

    // Set background color based on dark mode
    const isDark = $q.dark.isActive
    const backgroundColor = isDark ? '#181a1b' : '#ffffff'
    
    const canvas = await html2canvas(element as HTMLElement, {
      backgroundColor: backgroundColor,
      scale: 2,
      useCORS: true,
      logging: false
    })

    canvas.toBlob(async (blob) => {
      if (!blob) {
        hideLoading()
        showNotification('negative', t('businessCard.screenshotError'))
        return
      }

      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        hideLoading()
        showNotification('positive', t('businessCard.screenshotCopied'), 'fa-solid fa-check')
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
        hideLoading()
        showNotification('info', t('businessCard.screenshotDownloaded'), 'fa-solid fa-download')
      }
    })
  } catch (err) {
    console.error('Error capturing screenshot:', err)
    hideLoading()
    showNotification('negative', t('businessCard.screenshotError'))
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
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err)
      }
    }
  } else {
    try {
      await navigator.clipboard.writeText(mainPageUrl)
      showNotification('info', t('businessCard.urlCopied'), 'fa-solid fa-link')
    } catch (err) {
      console.error('Error copying URL:', err)
    }
  }
}

function downloadVCard() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Felix Schäfer',
    'ORG:Shepherd IT Sec',
    'TITLE:Cybersecurity & AI Research',
    'EMAIL;TYPE=WORK:felix@shepherd-itsec.com',
    'URL;TYPE=WORK:https://www.schaefer-itsec.com',
    'URL;TYPE=PROFILE:https://www.schaefer-itsec.com/card',
    'NOTE:Cybersecurity, AI, and Research. Independent computer scientist specializing in cyber defense, reverse engineering, and 5G/Kubernetes security.',
    'END:VCARD'
  ].join('\n')

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'Felix_Schaefer_Shepherd_IT_Sec.vcf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  showNotification('positive', t('businessCard.vcardDownloaded'), 'fa-solid fa-download')
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
                <div
                  v-for="item in contactItems"
                  :key="item.label"
                  class="contact-item q-mb-sm"
                >
                  <q-icon :name="item.icon" size="sm" color="primary" class="q-mr-sm" />
                  <div>
                    <div class="text-caption text-muted">{{ t(item.label) }}</div>
                    <div class="text-body2">
                      <a
                        v-if="item.href"
                        :href="item.href"
                        :target="item.external ? '_blank' : undefined"
                        :rel="item.external ? 'noopener' : undefined"
                        class="contact-link"
                      >
                        {{ item.value }}
                      </a>
                      <span v-else>{{ item.value }}</span>
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
                  icon="fa-solid fa-share-nodes"
                  :label="t('businessCard.share')"
                  @click.stop="shareCard"
                  size="sm"
                  class="action-btn"
                />
                <q-btn
                  outline
                  color="primary"
                  icon="fa-solid fa-copy"
                  :label="t('businessCard.copyCard')"
                  @click.stop="copyScreenshot"
                  size="sm"
                  class="action-btn"
                />
                <q-btn
                  outline
                  color="primary"
                  icon="fa-solid fa-address-card"
                  :label="t('businessCard.downloadVCard')"
                  @click.stop="downloadVCard"
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.business-card {
  border-radius: 24px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}

.business-card-content {
  flex: 0 1 auto;
  display: flex;
  padding: 2rem !important;
  overflow: visible;
  height: auto;
}

.card-layout {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  width: 100%;
  align-items: flex-start;
}

.card-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;
}

.card-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  padding-left: 2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
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

  .business-card {
    height: auto;
  }

  .business-card-content {
    padding: 1.5rem !important;
    overflow: visible;
  }

  .card-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .card-right {
    padding-left: 0;
    padding-top: 1.5rem;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
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

