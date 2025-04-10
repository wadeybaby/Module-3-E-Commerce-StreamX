<template>
    <div class="admin">
      <h1>Welcome Admin</h1>
      <!-- Movie Section -->
      <div class="section">
        <h2>Movies</h2>
        <label>
          <span>Movie Title</span>
          <input type="text" v-model="movieData.title" />
        </label>
        <label>
          Description
          <input type="text" v-model="movieData.description" />
        </label>
        <label>
          Year Released
          <input type="text" v-model="movieData.year_released" />
        </label>
        <label>
          Duration
          <input type="text" v-model="movieData.duration" />
        </label>
        <label>
          Rental Price
          <input type="text" v-model="movieData.rental_price" />
        </label>
        <label>
          Trailer Url
          <input type="text" v-model="movieData.trailer_url" />
        </label>
        <label>
          Image Link
          <input type="text" v-model="movieData.img_link" />
        </label>
        <button @click="addOrUpdateMovie">{{ movieData.movie_id ? 'Update' : 'Add' }} Movie</button>
      </div>
      <!-- Movie Table -->
      <div class="section">
        <h2>Movies List</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Year Released</th>
              <th>Duration</th>
              <th>Rental Price</th>
              <th>Trailer Url</th>
              <th>Image Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="movie in $store.state.movies" :key="movie.movie_id">
              <td>{{ movie.title }}</td>
              <td>{{ movie.description }}</td>
              <td>{{ movie.year_released }}</td>
              <td>{{ movie.duration }}</td>
              <td>{{ movie.rental_price }}</td>
              <td class="trailer-cell">{{ movie.trailer_url }}</td>
              <td>{{ movie.img_link }}</td>
              <td>
                <button class="delete" @click="deleteMovie(movie.movie_id)">Delete</button>
                <button class="edit" @click="editMovie(movie)">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Users Section -->
      <div class="section">
        <h2>Users</h2>
        <label>
          <span>Username</span>
          <input type="text" v-model="userData.username" />
        </label>
        <label>
          Email
          <input type="text" v-model="userData.email" />
        </label>
        <label>
          Role
          <input type="text" v-model="userData.user_role" />
        </label>
        <label>
          Phone Number
          <input type="text" v-model="userData.phone_number" />
        </label>
        <button v-if="userData.user_id" @click="updateUser">Update User</button>
      </div>
      <!-- Users Table -->
      <div class="section">
        <h2>Users List</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in $store.state.users" :key="user.user_id">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.user_role }}</td>
              <td>{{ user.phone_number }}</td>
              <td>
                <button class="delete" @click="deleteUser(user.user_id)">Delete</button>
                <button class="edit" @click="editUser(user)">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        movieData: {
          title: '',
          description: '',
          year_released: '',
          duration: '',
          rental_price: '',
          trailer_url: '',
          img_link: '',
          movie_id: null
        },
        userData: {
          username: '',
          email: '',
          user_role: '',
          phone_number: '',
          user_id: null
        }
      };
    },
    mounted() {
      this.$store.dispatch('getData');
    },
    methods: {
      addOrUpdateMovie() {
        if (this.movieData.movie_id) {
          this.$store.dispatch('patchMovie', { movie_id: this.movieData.movie_id, updatedData: this.movieData });
        } else {
          this.$store.dispatch('postMovie', this.movieData);
        }
        this.resetMovieForm();
      },
      deleteMovie(movie_id) {
        this.$store.dispatch('deleteMovie', movie_id);
      },
      editMovie(movie) {
        this.movieData = { ...movie };
      },
      resetMovieForm() {
        this.movieData = {
          title: '', description: '', year_released: '', duration: '', rental_price: '',
          trailer_url: '', img_link: '', movie_id: null
        };
      },
      deleteUser(user_id) {
        this.$store.dispatch('deleteUser', user_id);
      },
      editUser(user) {
        this.userData = { ...user };
      },
      updateUser() {
        this.$store.dispatch('patchUser', { user_id: this.userData.user_id, updatedData: this.userData });
        this.resetUserForm();
      },
      resetUserForm() {
        this.userData = { username: '', email: '', user_role: '', phone_number: '', user_id: null };
      }
    }
  };
  </script>
  <style scoped>
  .admin {
    padding: 20px;
    background-color: #111; /* Dark black background */
    color: #fff; /* White text */
    font-family: 'Arial', sans-serif;
  }
  h1 {
    font-size: 2em;
    color: #FFCC00; /* Yellow for the header */
    text-align: center;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 1.5em;
    color: #FFCC00;
    margin-top: 20px;
  }
  .section {
    margin-bottom: 30px;
    padding: 20px;
    border-radius: 10px;
    background-color: #222;
  }
  label {
    display: block;
    margin-bottom: 10px;
    color: #ccc; /* Light grey for labels */
  }
  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    background-color: #333;
    border: 1px solid #444;
    color: #fff;
    font-size: 1em;
    border-radius: 5px;
  }
  button {
    padding: 8px 16px; /* Reduced padding for smaller buttons */
    margin-top: 15px; /* Added more space between buttons */
    background-color: #FFCC00; /* Yellow background */
    color: #111;
    border: none;
    cursor: pointer;
    font-size: 0.9em; /* Reduced font size for smaller buttons */
    border-radius: 5px;
  }
  button:hover {
    background-color: #E6B800; /* Darker yellow on hover */
  }
  table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: #222;
    border-radius: 10px;
    overflow: hidden;
  }
  th, td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #444;
  }
  th {
    background-color: #111;
    color: #FFCC00;
  }
  td {
    background-color: #333;
    color: #ccc;
  }
  button.delete {
    background-color: red;
    color: white;
  }
  button.delete:hover {
    background-color: #D11A2A; /* Darker red on hover */
  }
  button.edit {
    background-color: #444;
    color: white;
  }
  button.edit:hover {
    background-color: #666;
  }
  .trailer-cell {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media (max-width: 768px) {
    .admin {
      padding: 10px;
    }
    input, button {
      width: 100%;
      padding: 10px;
    }
    table {
      font-size: 0.9em;
    }
  }
  </style>