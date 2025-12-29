<script setup lang="ts">
import { useI18n } from '../composables/useI18n'
import { socialLinks } from '../site/content'

const { t } = useI18n()

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

function shareCard() {
  if (navigator.share) {
    navigator.share({
      title: 'Shepherd IT Sec - Digital Business Card',
      text: 'Shepherd IT Sec - Cybersecurity & AI Research',
      url: window.location.href
    })
  }
}
</script>

<template>
  <div class="business-card-container">
    <div class="business-card-header q-mb-xl">
      <q-chip color="primary" text-color="white" size="md" class="q-mb-md">
        <q-icon name="fa-solid fa-id-card" class="q-mr-xs" />
        {{ t('businessCard.badge') }}
      </q-chip>
      <h1 class="page-title q-mt-sm q-mb-md">{{ t('businessCard.title') }}</h1>
      <p class="text-h6 text-muted">{{ t('businessCard.subtitle') }}</p>
    </div>

    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <q-card flat bordered class="business-card glass-modern">
          <q-card-section class="business-card-content q-pa-xl">
            <!-- Logo and Company Name -->
            <div class="card-header q-mb-lg">
              <img src="/logo.png" alt="Shepherd IT Sec" class="card-logo" />
              <h2 class="card-company-name">{{ t('site.name') }}</h2>
              <p class="card-tagline">{{ t('site.tagline') }}</p>
            </div>

            <q-separator class="q-my-lg" color="grey-8" />

            <!-- Contact Information -->
            <div class="card-contact q-mb-lg">
              <div class="contact-item q-mb-md">
                <q-icon name="fa-solid fa-user" size="md" color="primary" class="q-mr-md" />
                <div>
                  <div class="text-caption text-muted">{{ t('businessCard.name') }}</div>
                  <div class="text-body1">Felix Schäfer</div>
                </div>
              </div>

              <div class="contact-item q-mb-md">
                <q-icon name="fa-solid fa-envelope" size="md" color="primary" class="q-mr-md" />
                <div>
                  <div class="text-caption text-muted">{{ t('businessCard.email') }}</div>
                  <div class="text-body1">
                    <a href="mailto:felix@shepherd-itsec.com" class="contact-link">
                      felix@shepherd-itsec.com
                    </a>
                  </div>
                </div>
              </div>

              <div class="contact-item q-mb-md">
                <q-icon name="fa-solid fa-globe" size="md" color="primary" class="q-mr-md" />
                <div>
                  <div class="text-caption text-muted">{{ t('businessCard.website') }}</div>
                  <div class="text-body1">
                    <a href="https://www.schaefer-itsec.com" target="_blank" rel="noopener" class="contact-link">
                      www.schaefer-itsec.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <q-separator class="q-my-lg" color="grey-8" />

            <!-- Social Links -->
            <div class="card-social">
              <div class="text-caption text-muted q-mb-md">{{ t('businessCard.connect') }}</div>
              <div class="social-buttons row q-gutter-sm">
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
                  size="md"
                  class="social-btn"
                />
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="card-actions q-mt-xl">
              <q-btn
                outline
                color="primary"
                :icon="'fa-solid fa-share-nodes'"
                :label="t('businessCard.share')"
                @click="shareCard"
                class="q-mr-sm"
              />
              <q-btn
                outline
                color="primary"
                :icon="'fa-solid fa-link'"
                :label="t('businessCard.copyLink')"
                @click="copyToClipboard(window.location.href)"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.business-card-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.business-card-header {
  text-align: center;
}

.business-card {
  border-radius: 24px;
  max-width: 600px;
  margin: 0 auto;
}

.business-card-content {
  text-align: center;
}

.card-header {
  text-align: center;
}

.card-logo {
  height: 100px;
  width: auto;
  object-fit: contain;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.card-company-name {
  font-family: 'Bree Serif', serif;
  font-size: 2rem;
  font-weight: 700;
  margin: 0.5rem 0;
  color: var(--q-primary);
}

.card-tagline {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.body--light .card-tagline {
  color: rgba(0, 0, 0, 0.6);
}

.card-contact {
  text-align: left;
}

.contact-item {
  display: flex;
  align-items: flex-start;
}

.contact-link {
  color: var(--q-primary);
  text-decoration: none;
  transition: color 0.2s ease;
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

.card-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* glass-modern styles are now in app.scss */

@media (max-width: 600px) {
  .business-card-content {
    padding: 2rem 1.5rem !important;
  }

  .card-company-name {
    font-size: 1.5rem;
  }

  .card-logo {
    height: 80px;
  }

  .card-actions {
    flex-direction: column;
  }

  .card-actions .q-btn {
    width: 100%;
  }
}
</style>

