import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useGenreStore = defineStore('genre', () => {
  

  const genres = computed(() => state.genres);
  const getGenreName = (id : number) => {
    const genre = state.genres.find((genre : { id: number; name: string }) => genre.id === id);
    return genre ? genre.name : '';
  };

  const getAllGenres = async (type : string) => {
    const response = await api.get(`genre/${type}/list?language=pt-BR`);
    state.genres = response.data.genres;
  };
  const state = reactive({
    genres: [] as { id: number; name: string }[],
    currentGenreId: null as number | null,
  });
  
  const currentGenreId = computed(() => state.currentGenreId);

  const setCurrentGenreId = (genreId : number) => {
  state.currentGenreId = genreId;
};
  return { genres, getAllGenres, getGenreName, state, currentGenreId, setCurrentGenreId};
});