<template>
  <div class="movies-view">
    <div v-if="loading">Loading Movies...</div>
    <div v-else class="movie-cards">
      <router-link
        v-for="movie in movies"
        :key="movie.movie_id"
        :to="{ name: 'movie-details', params: { id: movie.movie_id } }"
        class="movie-card"
      >
        <img :src="movie.img_link" :alt="movie.title" class="movie-img" />
        <p class="movie-title">{{ movie.title }}</p>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['movies', 'loading']),
  },
  mounted() {
    if (!this.movies || this.movies.length === 0) {
      this.$store.dispatch('getData');
    }
  },
};
</script>
<style scoped>
.movies-view {
  padding: 20px;
  background-color: #121212;
  color: #fff;
  min-height: 100vh;
}
/* Set body background to black */
* {
  background-color: black; /* Applies black background to all elements */
}
/* Container for all movie cards */
.movie-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Ensure spacing between cards */
  gap: 20px;
}
/* Individual movie card */
.movie-card {
  text-align: center;
  width: 250px; /* Make cards smaller but still 3 in a row */
  margin-bottom: 20px;
  flex-basis: 400px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #1E1E1E;
  border-radius: 8px;
  padding: 10px;
}
.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.movie-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}
.movie-title {
  font-size: 18px; /* Makes the title readable */
  color: #FFCC00; /* Matches the button color for consistency */
}
/* --- RESPONSIVE DESIGN --- */
/* Tablets (max-width: 1024px) */
@media (max-width: 1024px) {
  .movie-cards {
    justify-content: center; /* Center align the movies */
    gap: 20px; /* Reduce spacing between cards */
  }
  .movie-card {
    width: 30%; /* Adjust width for two cards in a row */
  }
  .movie-title {
    font-size: 16px; /* Reduce title font size */
  }
  .play-button {
    font-size: 14px; /* Reduce button size */
    padding: 8px 16px;
  }
}
/* Mobile devices (max-width: 768px) */
@media (max-width: 768px) {
  .movie-cards {
    flex-direction: column; /* Stack movie cards */
    align-items: center; /* Center align cards */
    gap: 15px; /* Reduce spacing */
  }
  .movie-card {
    width: 90%; /* Make cards full width */
    max-width: 300px; /* Limit max width */
  }
  .movie-title {
    font-size: 14px; /* Smaller title */
  }
  .play-button {
    font-size: 12px; /* Adjust button size */
    padding: 6px 12px;
  }
}
</style>
