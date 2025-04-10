![image broken](https://github.com/indi06-star/Images/blob/11cc858bf8cd4e4dbcd67b90e06cd9ea5b9462a5/Screenshot%202025-04-09%20114812.png)

![image broken](https://github.com/indi06-star/Images/blob/af13e05cd872032d2f770ad45def4945229f9e53/Cart-ezgif.com-video-to-gif-converter%20(1).gif)

A fully functional e-commerce website built by Indiphile,Wade,Tiffany,Anathi for the Module 3 assignment. StreamX is an online movie rental platform that offers pay-per-view access to a wide range of movies without requiring subscriptions. Our goal is to provide an affordable, flexible, and secure rental service that competes with platforms like Google Play Movies while offering a superior customer experience.
Table of Contents
Live Demo
Technologies Used
Setup Instructions
Key Features
Credits (If Applicable)
Author
Live Demo
Link to the live deployed website

Technologies Used
Front-end: Vue
Styling: Custom CSS
Back-end: node
Database: MySQL
Setup Instructions
Follow these steps to run the system on your local development environment:

Prerequisites:

MySQL Server installed and running
Clone the Repository:

git clone https:https://github.com/indi06-star/StreamX.git
cd frontend and 
cd backend
Install Dependencies (if using Composer):

npm i
Database Setup:

Create a new database named streamx_db in your MySQL server.
Import the database schema from the provided SQL file (StreamXDB.sql - if applicable). You can do this using a MySQL client (like phpMyAdmin or MySQL Workbench) or the command line:
mysql -u [your_mysql_username] -streamx_db < database/StreamXDB.sql
Configure the database connection details in your PHP configuration file (e.g., config.php, .env):
<?php
// Example configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');
define('DB_NAME', 'streamx_db');
?>
Web Server Configuration:

Ensure your web server is configured to point to the project's public directory (or the main entry point of your application).
If using Apache, you might need to enable mod_rewrite and configure a .htaccess file (if provided).
Run the Development Server (Example using PHP's built-in server):

npm run serve for frontend
node --watch index.js for api 
Then, open your web browser and navigate to [http://localhost:8000.](http://localhost:8080/)

Key Features
This e-commerce website implements the following key features:

User Login and Registration: Secure user registration and login functionality.
User Interface Design and UX/UI Principles: A user-friendly and visually appealing design adhering to UX/UI best practices.
Service Display and Catalog Implementation: Clear and organized display of movies with detailed information and browsing capabilities.
Movie Cart and Order Process: A functional movie cart allowing users to add, modify, and checkout with their selected movie.
Responsive Design Implementation: The website adapts seamlessly to various screen sizes (desktop, tablet, mobile).
Database Design and Implementation: A well-structured database (StreamXDB) to store user, movie, and order data.
Authentication and User Management: Secure authentication for users and potentially an administrative interface for managing the website.
Service Data Management: An administrative interface for adding, editing, and deleting products.
Payment System Integration: Integration with a payment gateway (a simulated process).
Overall System Integration (Front-end and Back-end): Seamless communication and data flow between the user interface and the server-side logic.
Credits 

Vue: [https://vuejs.org/]
MySql: [https://www.mysql.com/]
Node : [https://nodejs.org/en]
Author
Indiphile, Wade, Tifanny ,Anathi

https://github.com/indi06-star
