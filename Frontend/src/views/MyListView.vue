  <template>
  <div>
    <h2>My Rentals</h2>
    <div v-for="rental in rentals" :key="rental.rental_id">
      <h3>Movie ID: {{ rental.movie_id }}</h3>
      <p>Start Date: {{ rental.rental_start }}</p>
      <p>End Date: {{ rental.rental_end }}</p>
      <p>Total Cost: ${{ rental.total_cost }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rentals: [],
    };
  },
  async mounted() {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        alert('Please log in.');
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/rentals/user/${userId}`);
      this.rentals = response.data;
    } catch (error) {
      console.error('Error fetching rentals:', error);
    }
  },
};
</script>

