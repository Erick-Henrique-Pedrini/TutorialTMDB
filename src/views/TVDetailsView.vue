<script setup>
import { defineProps, onMounted } from 'vue';
import { useTvStore } from '@/stores/tv';

const tvStore = useTvStore();

const props = defineProps({
  tvId: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  await tvStore.getTvDetail(props.tvId);
});
</script>

<template>
  <div class="main">
    <div class="content">
      <img
        :src="`https://image.tmdb.org/t/p/w185${tvStore.currentTv.poster_path}`"
        :alt="tvStore.currentTv.name"
      />

      <div class="details">
        <h1>Série: {{ tvStore.currentTv.name }}</h1>
        <p v-if="tvStore.currentTv.tagline">"{{ tvStore.currentTv.tagline }}"</p>
        <p>{{ tvStore.currentTv.overview }}</p>
        <p>
          <strong>Data de estreia:</strong>
          {{ new Date(tvStore.currentTv.first_air_date).toLocaleDateString('pt-BR') }}
        </p>
        <p><strong>Temporadas:</strong> {{ tvStore.currentTv.number_of_seasons }}</p>
        <p><strong>Episódios:</strong> {{ tvStore.currentTv.number_of_episodes }}</p>
        <p><strong>Avaliação:</strong> {{ tvStore.currentTv.vote_average }}</p>
      </div>
    </div>
  </div>

  <p>Produtoras</p>
  <div class="companies">
    <template
      v-for="company in tvStore.currentTv.production_companies"
      :key="company.id"
    >
      <img
        v-if="company.logo_path"
        :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
        :alt="company.name"
      />
      <p v-else>{{ company.name }}</p>
    </template>
  </div>
</template>

<style scoped>
  .companies {
    display: flex;
    flex-direction: row;
    column-gap: 3rem;
    align-items: center;
    margin-bottom: 2rem;
  }
</style>
