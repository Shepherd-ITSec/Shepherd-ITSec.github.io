<script setup lang="ts">
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
</script>

<template>
  <div class="row items-stretch q-col-gutter-xl">
    <div class="col-12 col-md">
      <q-card flat bordered class="glass q-pa-lg full-height">
        <div class="text-overline text-muted">{{ t('site.tagline') }}</div>
        <h1 class="headline q-mt-sm q-mb-md">{{ t('home.greeting') }}</h1>

        <p class="lead">
          {{ t('home.intro') }}
        </p>

        <div class="q-mt-lg row items-center q-gutter-sm">
          <q-btn color="primary" unelevated :label="t('home.postsButton')" to="/posts" />
          <q-btn flat color="primary" :label="t('home.contactButton')" href="mailto:felix@oje-oje.de" />
        </div>
      </q-card>
    </div>

    <div class="col-12 col-md-auto">
      <q-card flat bordered class="glass q-pa-lg profile-card">
        <q-img
          class="profile-img"
          src="/about/profile.jpg"
          alt="Profile photo"
          fit="cover"
          ratio="3/4"
        />
        <div class="q-mt-md">
          <div class="text-subtitle1">Felix Schäfer</div>
          <div class="text-caption text-muted">{{ t('home.subtitle') }}</div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<style scoped>
.headline {
  font-family: 'Bree Serif', serif;
  margin: 0 0 10px;
}

.lead {
  line-height: 1.6;
}

.glass {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
  border-radius: 14px;
}

.profile-card {
  width: 260px;
}

.profile-img {
  overflow: hidden;
  border-radius: 14px;
}
</style>


