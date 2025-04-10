import { pool } from '../config/config.js'; // FIXED: Import pool for DB connection

export const rentMovie = async (req, res) => {
  try {
      console.log("Request Body:", req.body);
      console.log("User Object:", req.user);

      const { movie_id, rental_start, rental_end, total_cost } = req.body;
      if (!movie_id || !rental_start || !rental_end || !total_cost) {
          return res.status(400).json({ message: "Missing required fields" });
      }

      const user_id = req.user?.user_id;
      if (!user_id) {
          return res.status(401).json({ message: "Unauthorized. User not found." });
      }

      // Insert rental into the database
      const [result] = await pool.execute(
          "INSERT INTO rentals (user_id, movie_id, rental_start, rental_end, total_cost) VALUES (?, ?, ?, ?, ?)",
          [user_id, movie_id, rental_start, rental_end, total_cost]
      );

      res.status(201).json({ message: "Movie rented successfully", rental_id: result.insertId });
  } catch (error) {
      console.error("Error renting movie:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
