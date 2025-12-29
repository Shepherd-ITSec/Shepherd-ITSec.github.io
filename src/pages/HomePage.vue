<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

function openCardPopup() {
  const width = 900
  const height = 700
  const left = (window.screen.width - width) / 2
  const top = (window.screen.height - height) / 2
  
  window.open(
    '/card/popup',
    'businessCard',
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no`
  )
}

const expertises = [
  {
    icon: 'fa-solid fa-shield-halved',
    title: 'home.expertise1.title',
    description: 'home.expertise1.description',
    action: () => {}
  },
  {
    icon: 'fa-solid fa-robot',
    title: 'home.expertise2.title',
    description: 'home.expertise2.description',
    action: () => {}
  },
  {
    icon: 'fa-solid fa-code',
    title: 'home.expertise3.title',
    description: 'home.expertise3.description',
    action: () => {}
  }
]
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <div class="hero-section q-mb-xl">
      <div class="hero-content">
        <div class="hero-badge q-mb-md">
          <q-chip color="primary" text-color="white" size="md" class="hero-chip">
            <q-icon name="fa-solid fa-shield-halved" class="q-mr-xs" />
            {{ t('site.tagline') }}
          </q-chip>
        </div>
        <h1 class="hero-title">{{ t('home.greeting') }}</h1>
        <p class="hero-subtitle">{{ t('home.intro') }}</p>
        <div class="hero-actions q-mt-xl">
          <q-btn
            color="primary"
            unelevated
            size="lg"
            :label="t('home.postsButton')"
            to="/posts"
            icon="fa-solid fa-book"
            class="hero-btn q-mr-md"
          />
          <q-btn
            outline
            color="primary"
            size="lg"
            :label="t('home.contactButton')"
            href="mailto:felix@shepherd-itsec.com"
            icon="fa-solid fa-envelope"
            class="hero-btn q-mr-md"
          />
          <q-btn
            outline
            color="primary"
            size="lg"
            :label="t('home.cardButton')"
            icon="fa-solid fa-id-card"
            class="hero-btn"
            @click="openCardPopup"
          />
        </div>
      </div>
      <div class="hero-image">
        <q-card class="profile-card-modern" v-ripple>
          <q-img
            class="profile-img-modern"
            src="/about/profile.jpg"
            alt="Profile photo"
            fit="contain"
            ratio="3/4"
            :img-style="{ objectFit: 'contain', objectPosition: 'center top' }"
            loading="eager"
            no-spinner
            no-transition
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-grey-8 text-white">
                <div class="text-center">
                  <q-icon name="fa-solid fa-user" size="3rem" class="q-mb-sm" />
                  <div class="text-caption">Image not found</div>
                </div>
              </div>
            </template>
            <div class="absolute-full profile-overlay" />
          </q-img>
          <q-card-section class="profile-info">
            <div class="text-h6 text-weight-bold">Felix Schäfer</div>
            <div class="text-caption text-muted q-mt-xs">{{ t('home.subtitle') }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Services/Expertise Cards -->
    <div class="expertise-section q-mt-xl">
      <h2 class="section-title q-mb-lg">{{ t('home.expertiseTitle') }}</h2>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4" v-for="(expertise, index) in expertises" :key="index">
          <q-card
            flat
            bordered
            class="expertise-card"
            v-ripple
            @click="expertise.action"
          >
            <q-card-section>
              <div class="expertise-icon q-mb-md">
                <q-icon :name="expertise.icon" size="3rem" color="primary" />
              </div>
              <div class="text-h6 q-mb-sm">{{ t(expertise.title) }}</div>
              <div class="text-body2 text-muted">{{ t(expertise.description) }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
  min-height: 500px;
  padding: 2rem 0;
}

.hero-content {
  animation: fadeInLeft 0.8s ease-out;
}

.hero-badge {
  display: inline-block;
}

.hero-chip {
  font-weight: 500;
  padding: 8px 16px;
}

.hero-title {
  font-family: 'Bree Serif', serif;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 1.5rem 0;
  background: linear-gradient(135deg, var(--q-primary) 0%, var(--q-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  max-width: 600px;
  margin: 1rem 0;
}

.body--light .hero-subtitle {
  color: rgba(0, 0, 0, 0.7);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-btn {
  padding: 12px 32px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.hero-image {
  animation: fadeInRight 0.8s ease-out;
}

.profile-card-modern {
  width: 300px;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.profile-card-modern:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.profile-img-modern {
  border-radius: 20px 20px 0 0;
  min-height: 300px;
  width: 100%;
  display: block;
  background-color: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.body--light .profile-img-modern {
  background-color: rgba(0, 0, 0, 0.05);
}

.profile-img-modern img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center top;
}

.profile-overlay {
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.1) 100%);
  pointer-events: none;
}

.profile-info {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.body--light .profile-info {
  background: rgba(0, 0, 0, 0.03);
}

.expertise-section {
  margin-top: 4rem;
}

.section-title {
  font-family: 'Bree Serif', serif;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
}

.expertise-card {
  height: 100%;
  border-radius: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.body--light .expertise-card {
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.expertise-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--q-primary);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.body--light .expertise-card:hover {
  background: rgba(0, 0, 0, 0.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.expertise-icon {
  display: inline-flex;
  padding: 1rem;
  background: rgba(22, 143, 139, 0.15);
  border-radius: 12px;
}

@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-image {
    justify-self: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .hero-btn {
    width: 100%;
  }

  .profile-card-modern {
    width: 100%;
    max-width: 300px;
  }
}
</style>


