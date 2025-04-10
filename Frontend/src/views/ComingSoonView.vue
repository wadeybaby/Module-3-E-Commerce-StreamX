<template>
  <div class="movies">
    <h1 class="page-title">Coming Soon</h1>
    <!-- Show loading indicator -->
    <div v-if="loading" class="loading">Loading movies...</div>
    <!-- Show error message -->
    <div v-else-if="error" class="error">{{ error }}</div>
    <!-- Movie Cards -->
    <div v-else class="movie-cards">
      <div v-for="movie in comingSoonMovies" :key="movie.id" class="movie-card">
        <img :src="movie.img_link" alt="Movie Poster" />
        <h3 class="movie-title">{{ movie.title }}</h3>
        <p class="movie-release-date">Release Date: {{ formatDate(movie.release_date) }}</p>
        <p class="movie-description">{{ movie.description }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
export default {
  setup() {
    const store = useStore();
    const comingSoonMovies = computed(() => store.state.comingSoonMovies);
    const loading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);
    // Format release date
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };
    // Fetch movies when the component is mounted
    onMounted(() => {
      store.dispatch("fetchComingSoonMovies");
    });
    return { comingSoonMovies, loading, error, formatDate };
  },
};
</script>
<style scoped>
.movies {
  background-color: black;
  text-align: center;
  padding: 20px;
  color: white;
  min-height: 100vh;
}
/* "Coming Soon" title */
.page-title {
  font-size: 26px;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
}
.loading {
  font-size: 18px;
  color: #FFCC00;
}
.error {
  color: red;
  font-size: 16px;
}
.movie-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /*3 cards per row */
  justify-content: center;
  gap: 20px;
  row-gap: 40px;
  margin-top: 20px;
  padding: 0 10%;
}
.movie-card {
  width: 250px;
  background-color: #222;
  border-radius: 10px;
  padding: 15px;
  color: white;
  transition: transform 0.2s;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
}
.movie-card:hover {
  transform: scale(1.05);
}
.movie-card img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
}
.movie-title {
  font-size: 18px;
  color: #FFCC00;
  margin-top: 10px;
}
.movie-release-date {
  font-size: 14px;
  color: #00B5E2;
}
.movie-description {
  font-size: 14px;
  margin-top: 10px;
}
</style>