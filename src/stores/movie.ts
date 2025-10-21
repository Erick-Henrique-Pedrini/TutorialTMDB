import { reactive, computed, ref} from 'vue';
import { defineStore } from 'pinia';

import api from '@/plugins/axios';
import { useGenreStore } from './genre';

export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    isLoading : ref(false),
    currentMovie: {},
  });

  const currentMovie = computed(() => state.currentMovie);

  const getMovieDetail = async (movieId: number) => {
    const response = await api.get(`movie/${movieId}`);
    state.currentMovie = response.data;
  };
  const setLoading = (value: boolean) => {
  state.isLoading = value;
};

const isLoading = computed(() => state.isLoading);
  const movies = ref([]);

 const listMovies = async (genreId : number) => {
  const genreStore = useGenreStore();
  genreStore.setCurrentGenreId(genreId);
  console.log(genreStore.currentGenreId);
 
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });
  movies.value = response.data.results;
  setLoading(false);
};
  
   const formatDate = (date: string | number | Date) => new Date(date).toLocaleDateString('pt-BR');
  return { currentMovie, getMovieDetail, movies, listMovies, formatDate, isLoading, setLoading };
});