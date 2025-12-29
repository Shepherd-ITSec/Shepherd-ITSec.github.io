<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()

const appointmentUrl = 'http://schaefer-itsec.com/appointment/'
const useEmbed = ref(false)

function openAppointments() {
  window.open(appointmentUrl, '_blank', 'noopener,noreferrer')
}

const features = [
  { icon: 'fa-solid fa-check-circle', text: 'appointments.feature1' },
  { icon: 'fa-solid fa-check-circle', text: 'appointments.feature2' },
  { icon: 'fa-solid fa-check-circle', text: 'appointments.feature3' }
]
</script>

<template>
  <div class="appointments-container">
    <div class="appointments-header q-mb-xl">
      <q-chip color="primary" text-color="white" size="md" class="q-mb-md">
        <q-icon name="fa-solid fa-calendar-check" class="q-mr-xs" />
        {{ t('appointments.badge') }}
      </q-chip>
      <h1 class="page-title q-mt-sm q-mb-md">{{ t('appointments.title') }}</h1>
      <p class="text-h6 text-muted">{{ t('appointments.subtitle') }}</p>
    </div>

    <div class="row q-col-gutter-lg">
      <!-- Main Booking Card -->
      <div class="col-12 col-lg-8">
        <q-card flat bordered class="glass-modern booking-card q-pa-xl">
          <div class="booking-content">
            <div class="booking-icon q-mb-lg">
              <q-icon name="fa-solid fa-calendar-days" size="4rem" color="primary" />
            </div>
            <h2 class="booking-title q-mb-md">{{ t('appointments.bookingTitle') }}</h2>
            <p class="booking-description q-mb-xl">
              {{ t('appointments.bookingDescription') }}
            </p>
            <div class="booking-features q-mb-xl">
              <div class="feature-item q-mb-md" v-for="(feature, index) in features" :key="index">
                <q-icon :name="feature.icon" size="md" color="primary" class="q-mr-sm" />
                <span>{{ t(feature.text) }}</span>
              </div>
            </div>
            <q-btn
              color="primary"
              unelevated
              size="lg"
              :label="t('appointments.bookButton')"
              icon="fa-solid fa-arrow-right"
              class="booking-btn"
              @click="openAppointments"
            />
          </div>
        </q-card>
      </div>

      <!-- Info Card -->
      <div class="col-12 col-lg-4">
        <q-card flat bordered class="glass-modern info-card q-pa-lg">
          <div class="info-section q-mb-lg">
            <q-icon name="fa-solid fa-clock" size="2rem" color="primary" class="q-mb-md" />
            <h3 class="info-title q-mb-sm">{{ t('appointments.hoursTitle') }}</h3>
            <p class="text-body2 text-muted">{{ t('appointments.hoursText') }}</p>
          </div>

          <q-separator class="q-my-lg" color="grey-8" />

          <div class="info-section">
            <q-icon name="fa-solid fa-envelope" size="2rem" color="primary" class="q-mb-md" />
            <h3 class="info-title q-mb-sm">{{ t('appointments.contactTitle') }}</h3>
            <p class="text-body2 text-muted q-mb-md">{{ t('appointments.contactText') }}</p>
            <q-btn
              flat
              color="primary"
              :label="t('home.contactButton')"
              icon="fa-solid fa-envelope"
              href="mailto:felix@shepherd-itsec.com"
              class="q-mt-sm"
            />
          </div>
        </q-card>
      </div>
    </div>

    <!-- Embedded Booking (Optional) -->
    <div v-if="useEmbed" class="q-mt-xl">
      <q-card flat bordered class="glass-modern q-pa-none">
        <q-card-section class="q-pa-lg">
          <div class="row items-center justify-between q-mb-md">
            <h3 class="q-ma-none">{{ t('appointments.embeddedTitle') }}</h3>
            <q-btn
              flat
              round
              icon="fa-solid fa-times"
              @click="useEmbed = false"
            />
          </div>
        </q-card-section>
        <q-separator />
        <div class="booking-iframe-container">
          <iframe
            :src="appointmentUrl"
            class="booking-iframe"
            frameborder="0"
            title="Appointment Booking"
          />
        </div>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.appointments-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.appointments-header {
  text-align: center;
}

.booking-card {
  min-height: 500px;
  display: flex;
  align-items: center;
  border-radius: 20px;
}

.booking-content {
  width: 100%;
  text-align: center;
}

.booking-icon {
  display: inline-block;
  padding: 1.5rem;
  background: rgba(100, 181, 246, 0.1);
  border-radius: 16px;
}

.booking-title {
  font-family: 'Bree Serif', serif;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
}

.booking-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  max-width: 600px;
  margin: 0 auto;
}

.booking-features {
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.booking-btn {
  padding: 14px 40px;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.booking-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

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

.booking-iframe-container {
  position: relative;
  width: 100%;
  min-height: 800px;
  overflow: hidden;
}

.booking-iframe {
  width: 100%;
  height: 800px;
  border: none;
  display: block;
}

@media (max-width: 1024px) {
  .booking-card {
    min-height: auto;
    padding: 2rem !important;
  }

  .booking-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 600px) {
  .booking-description {
    font-size: 1rem;
  }

  .booking-btn {
    width: 100%;
  }
}
</style>


