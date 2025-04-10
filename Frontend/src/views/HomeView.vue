<template>
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-overlay">
      <h1>Unlimited Movies, at the Click of a Button</h1>
      <p>Watch anywhere.</p>
      <router-link to="/movies" class="btn">Start Watching</router-link>
    </div>
  </section>

  <!-- Movie Section -->
  <section class="movies-section">
    <h2 class="section-title">Trending Now</h2>

    <!-- Movie Cards Section -->
    <div class="movie-cards">
      <div 
        class="movie-card"
        v-for="(movie, index) in movies"
        :key="movie.movie_id"
      >
        <router-link :to="'/movies/' + movie.movie_id" class="movie-card-link">
          <img :src="movie.img_link" class="movie-img" :alt="movie.title" />
          <p class="movie-title">{{ movie.title }}</p>
        </router-link>
      </div>
    </div>
  </section>

  <!-- Footer Section -->
  <footer class="footer">
    <div class="footer-content">
      <div class="social-media">
        <a href="https://www.facebook.com" target="_blank" class="social-icon facebook">facebook
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" class="social-icon instagram">instagram
          <i class="fab fa-instagram"></i>
        </a>
      </div>
      <p>&copy; 2025 MovieSite - All Rights Reserved</p>
    </div>
  </footer>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
    };
  },
  created() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get('http://localhost:3001/movies');
        this.movies = response.data;
      } catch (error) {
        console.error("There was an error fetching the movies:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Hero Section */
.hero {
  position: relative;
  width: 100%;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  background-size: cover;
  background-position: center;
  animation: backgroundBlend 20s ease-in-out infinite;
  transition: background-image 1s ease-in-out;
}
.footer a{
  color:white;
}
.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/collage2.jpg");
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);
  z-index: 0;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.hero-overlay {
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  border-radius: 0px;
  z-index: 1;
}

h1 {
  font-family: Arial, sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

p {
  font-family: Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background: #ffcc00;
  color: white;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: 0.3s;
}

.btn:hover {
  background: yellow;
}

@keyframes backgroundBlend {
  0% {
    background-image: url("@/assets/college.jpg");
  }
  50% {
    background-image: url("@/assets/collage2.jpg");
  }
  100% {
    background-image: url("@/assets/college.jpg");
  }
}

.hero:hover::before {
  opacity: 1;
}

/* Movie Section */
.movies-section {
  padding: 40px;
  background-color: black; /* Dark background color for movie section */
  color: white;
  min-height: 30vh;
}

.section-title {
  font-size: 24px;
  margin-bottom: 20px;
}

/* Movie Cards Container */
.movie-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* Centers the items and makes use of space */
  gap: 30px;
  width: 100%;
  height: auto; /* Adjust the height to fit the content */
  align-items: center; /* Centers the cards vertically */
  overflow-y: auto; /* Enables scrolling if the content overflows */
  background-color: black; /* Ensure background remains dark for movie cards */
}
.movie-card-link {
  text-decoration: none;
  color: black;
}

.movie-card {
  width: 300px; /* Set width for the cards */
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for scale and shadow */
  background-color: #000; /* Ensure the card has a black background */
  border-radius: 10px; /* Rounded corners */
  padding: 10px; /* Add padding around the content */
}

.movie-card:hover {
  transform: scale(1.05); /* Scale the card slightly */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Add a shadow for 3D effect */
}

.movie-card img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.movie-title {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

/* Footer Section */
.footer {
  background-color: black;
  padding: 30px 0;
  color: black;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.social-media {
  margin-bottom: 10px;
}

.social-icon {
  font-size: 30px;
  color: #fff;
  margin: 0 15px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.social-icon:hover {
  color: #ffcc00;
  transform: scale(1.1);
}


.footer p {
  font-size: 14px;
  color: #888;
}
</style>
