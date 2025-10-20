<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre';
import { useRouter } from 'vue-router';

const router = useRouter();
function openTvShow(tvId) {
  router.push({ name: 'TvDetails', params: { tvId } });
}

const genreStore = useGenreStore();
const isLoading = ref(false);
const tvShows = ref([]);

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('tv'); // carrega os gêneros de séries
  isLoading.value = false;
});

const listTvShows = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });
  tvShows.value = response.data.results;
  isLoading.value = false;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
</script>

<template>
  <loading v-model:active="isLoading" is-full-page />
  <div>
    <h1>Programas de TV</h1>
    <ul class="genre-list">
      <li
        v-for="genre in genreStore.genres"
        :key="genre.id"
        @click="listTvShows(genre.id)"
        class="genre-item"
        :class="{ active: genre.id === genreStore.currentGenreId }"
      >
        {{ genre.name }}
      </li>
    </ul>

    <div class="movie-list">
      <div v-for="tv in tvShows" :key="tv.id" class="movie-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
          :alt="tv.name"
          @click="openTvShow(tv.id)"
        />
        <div class="movie-details">
          <p class="movie-title">{{ tv.name }}</p>
          <p class="movie-release-date">
            {{ formatDate(tv.first_air_date) }}
          </p>

          <div class="movie-genres">
            <span
              v-for="genre_id in tv.genre_ids"
              :key="genre_id"
              @click="listTvShows(genre_id)"
              :class="{ active: genre_id === genreStore.currentGenreId }"
            >
              {{ genreStore.getGenreName(genre_id) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
  padding: 0;
}

.genre-item {
  background-color: #5d6424;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  align-self: center;
  color: #fff;
  display: flex;
  justify-content: center;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #7d8a2e;
  box-shadow: 0 0 0.5rem #5d6424;
}

.active {
  background-color: #a4b832;
  font-weight: bolder;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.movie-details {
  padding: 0 0.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.movie-genres span.active {
  background-color: #a4b832;
  color: #000;
  font-weight: bolder;
}
</style>
