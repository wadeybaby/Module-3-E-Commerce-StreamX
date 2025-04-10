import { pool } from '../config/config.js';
import {
  getAllUsers,
  getUserById as findUserById,
  signUpUser as signUpSingleUser,
  deleteSingleUser,
  updateUser,
} from "../model/usersModal.js";
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
// Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Fetch a single user by ID
export const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await findUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user_role = user.email.endsWith("@StreamX.com") ? "admin" : "user";
    res.status(200).json({ ...user, user_role });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Sign up a new user
export const signUpUser = async (req, res) => {
  try {
    const { username, email, phone_number, password } = req.body;
    const newUser = await signUpSingleUser(username, email, phone_number, password);
    res.status(201).json({
      message: "User signed up successfully",
      user: {
        user_id: newUser.user_id,
        username,
        email,
        phone_number,
        user_role: newUser.user_role,
      },
    });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Get a single user by user_id
export const getUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await findUserById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Delete a single user by user_id
export const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await deleteSingleUser(user_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Update an existing user by user_id
export const patchUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const updateData = req.body;
    const result = await updateUser(user_id, updateData);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found or no changes made" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  // console.table(req.body);
  // try {
    // console.log("Login: Checking email:", email);
    const [rows] = await pool.query(
      'SELECT user_id, username, password_hash, email FROM users WHERE email = ?',
      [email]
    );
    // console.log("Login: Direct Query Result:", rows[0]);
    const user = rows[0];
    if (!user) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    // console.log("Password:", password);
    // console.log("Hash:", user.password_hash);
    const passwordMatch = await compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'User logged in successfully', token, user });
  // } catch (error) {
  //   console.error('Login error:', error);
  //   res.status(500).send({ message: 'Internal server error' });
  // }
};