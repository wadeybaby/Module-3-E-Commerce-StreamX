import { pool } from "../config/config.js";
import bcrypt from "bcrypt";
// Function to get all users
export const getAllUsers = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    throw error;
  }
};
// Function to get a user by user_id
export const getUserById = async (user_id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    throw error;
  }
};
export const signUpUser = async (username, email, phone_number, password) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    const query = "INSERT INTO users (username, password_hash, email, phone_number) VALUES (?, ?, ?, ?)";
    const [result] = await pool.query(query, [username, hashedPassword, email, phone_number]);
    // Determine the role based on email
    const user_role = email.endsWith("@StreamX.com") ? "admin" : "user";
    await pool.query("UPDATE users SET user_role = ? WHERE user_id = ?", [user_role, result.insertId]);
    // Return the inserted user details
    return { user_id: result.insertId, username, email, phone_number, user_role };
  } catch (error) {
    throw error;
  }
};
// Function to update an existing user by user_id
export const updateUser = async (user_id, updateData) => {
  try {
    const updateFields = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(updateData);
    values.push(user_id); // Push user_id at the end for WHERE condition
    const [result] = await pool.query(
      `UPDATE users SET ${updateFields} WHERE user_id = ?`,
      values
    );
    return result;
  } catch (error) {
    throw error;
  }
};
// Function to delete a single user by user_id
export const deleteSingleUser = async (user_id) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [user_id]);
    return result;
  } catch (error) {
    throw error;
  }
};
export const findUserByEmail = async (email) => {
  try {
    const [rows] = await pool.query('SELECT user_id, username, password_hash, email FROM users WHERE email = ?', [email]); // Include password_hash
    return rows;
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    return []; // Return an empty array on error to prevent further issues
  }
};