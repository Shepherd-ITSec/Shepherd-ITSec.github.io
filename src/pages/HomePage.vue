<template>
  <div class="row items-stretch q-col-gutter-xl">
    <div class="col-12 col-md">
      <q-card flat bordered class="glass q-pa-lg full-height">
        <div class="text-overline text-muted">Cybersecurity • AI • Research</div>
        <h1 class="headline q-mt-sm q-mb-md">Hello, my name is Felix Schäfer</h1>

        <p class="lead">
          I am an independent and experienced computer scientist, currently studying Cybersecurity
          and AI at Radboud University Nijmegen. During my previous studies at Rheinische
          Friedrich-Wilhelms-Universität Bonn, I gained expertise in cutting-edge cybersecurity
          concepts. Following that, I worked at Fraunhofer FKIE, focusing on developing innovative
          reverse engineering methods. In recent years, I have worked as a Cyber Defense Consultant
          for TÜV Nord and PROCYDE, specializing in 5G communication and the security of Kubernetes
          systems.
        </p>

        <div class="q-mt-lg row items-center q-gutter-sm">
          <q-btn color="primary" unelevated label="Posts" to="/posts" />
          <q-btn flat color="primary" label="Contact" href="mailto:felix@oje-oje.de" />
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
          <div class="text-caption text-muted">Cyber Defense • Reverse Engineering</div>
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


