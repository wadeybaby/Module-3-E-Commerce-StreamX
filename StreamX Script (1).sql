CREATE DATABASE streamX_db;
USE streamX_db;

-- Users Table
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  user_role ENUM('admin', 'user') NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone_number VARCHAR(15)
);

-- Delete user with user_id 1
DELETE FROM users WHERE user_id = 1;

-- Alter column phone_number to make it NOT NULL
ALTER TABLE users
CHANGE COLUMN phone_number phone_number VARCHAR(15) NOT NULL;

-- Movies Table
CREATE TABLE movies (
  movie_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  year_released INT,
  duration INT,
  rental_price DECIMAL(10,2) NOT NULL,
  trailer_url VARCHAR(250) NOT NULL,
  img_link VARCHAR(250) NOT NULL
);

-- Insert sample movies
INSERT INTO movies (title, description, year_released, duration, rental_price, trailer_url, img_link)
VALUES
("Journey 2", "A young adventurer teams up with a seasoned explorer on a thrilling expedition to the mysterious island of Atlantis.", "2012", "94", "29.99", "https://player.vimeo.com/video/1058973949?h=cd29e5d448&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", "https://upload.wikimedia.org/wikipedia/en/8/8e/Journey_2_Poster.jpg"),
("Joker: Folie à Deux", "A troubled comedian's descent into madness leads him to becoming the infamous villain, the Joker.", "2024", "138", "49.99", "https://player.vimeo.com/video/1058973880?h=51d0b7cb17&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", "https://upload.wikimedia.org/wikipedia/en/e/e8/Joker_-_Folie_%C3%A0_Deux_poster.jpg"),
("Diary of a Mad Black Woman", "After being married for 18 years, Helen's husband divorces her for another woman. Heartbroken, she moves in with her sassy grandmother who helps her overcome the trauma.", "2005", "116", "50", "https://player.vimeo.com/video/1058974418?h=a7a1f307a0&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", "https://upload.wikimedia.org/wikipedia/en/8/87/Diaryofamadblackwoman_poster.jpg"),
("Mufasa: The Lion King", "A prequel to The Lion King, this film tells the backstory of Mufasa’s rise to greatness.", "2024", "120", "70", "https://player.vimeo.com/video/1058974224?h=7f729b316b&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", "https://upload.wikimedia.org/wikipedia/en/0/0b/Mufasa_The_Lion_King_Movie_2024.jpeg"),
("Me Before You", "Me Before You is a romantic drama about a young caregiver who forms an unexpected bond with a paralyzed man, challenging both of their perspectives on life and love.", "2016", "110", "30", "https://player.vimeo.com/video/1058974083?h=e4e865a380&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", "https://upload.wikimedia.org/wikipedia/en/e/e0/Me_Before_You.jpg"),
("Smile", "Smile is a psychological horror film about a therapist who begins experiencing terrifying supernatural occurrences after witnessing a patient's traumatic suicide, leading her to uncover a dark and deadly curse.", "2022", "115", "40", "https://player.vimeo.com/video/1058974290?h=b5083adeea&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", "https://upload.wikimedia.org/wikipedia/en/7/7f/Smile_%282022_film%29.jpg"),
("Moana 2", "Moana 2 follows Moana on a brand-new adventure across the vast seas, where she reunites with Maui and embarks on an epic journey to discover new lands and face unforeseen challenges beyond the horizon.", "2024", "100", "60", "https://player.vimeo.com/video/1058974150?h=8e2c122459&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", "https://upload.wikimedia.org/wikipedia/en/7/73/Moana_2_poster.jpg"),
("The Marvels", "The Marvels follows Carol Danvers (Captain Marvel) as she teams up with Kamala Khan (Ms. Marvel) and Monica Rambeau after their powers become mysteriously intertwined. Together, they must work as a team to face a new cosmic threat and restore balance to the universe.", "2023", "105", "40", "https://player.vimeo.com/video/1058974022?h=bc12a25ff7&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", "https://upload.wikimedia.org/wikipedia/en/7/7a/The_Marvels_poster.jpg"),
("Spider-Man: No Way Home", "Spider-Man seeks the help of Doctor Strange to forget his exposed secret identity as Peter Parker. However, Strange's spell goes horribly wrong, leading to unwanted guests entering their universe.", "2021", "148", "80", "https://player.vimeo.com/video/1058974339?h=53af1dee45&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479", "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg");

-- Cart Table
CREATE TABLE cart (
  cart_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  quantity INT DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

-- Payments Table (Updated to remove payment_date and status columns)
CREATE TABLE payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  movie_id INT NOT NULL,
  user_id INT,
  payment_method ENUM('Credit/Debit Card') NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
);

-- Rentals Table
CREATE TABLE rentals (
  rental_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  movie_id INT,
  rental_start DATE NOT NULL,
  rental_end DATE NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Coming Soon Table
CREATE TABLE coming_soon (
  soon_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  img_link VARCHAR(255),
  release_date DATE NOT NULL,
  description TEXT
);

-- Insert Coming Soon Movies
INSERT INTO coming_soon (title, img_link,release_date,description)
VALUES
("Flight Risk", "https://upload.wikimedia.org/wikipedia/en/e/e2/Flight_risk_2024.jpg", "2025-03-11", "A pilot transports an Air Marshal accompanying a fugitive to trial. As they cross the Alaskan wilderness, tensions soar and trust is tested, as not everyone on board is who they seem."),
("Captain America: Brave New World", "https://upload.wikimedia.org/wikipedia/en/a/a4/Captain_America_Brave_New_World_poster.jpg", "2025-03-13", "Sam Wilson, the new Captain America, finds himself in the middle of an international incident and must discover the motive behind a nefarious global plan."),
("The Gorge", "https://upload.wikimedia.org/wikipedia/en/d/dc/The_Gorge_%28film%29_poster.jpg", "2025-03-15", "Two highly-trained operatives become close after being sent to protect opposite sides of a mysterious gorge. When an evil emerges, they must work together to survive what lies within."),
("Companion", "https://upload.wikimedia.org/wikipedia/en/4/48/Companion_film_poster.jpg", "2025-03-18", "A weekend getaway with friends at a remote cabin turns into chaos after it's revealed that one of the guests is not what they seem."),
("Kinda Pregnant", "https://upload.wikimedia.org/wikipedia/en/e/ee/Kinda_Pregnant.jpg", "2025-03-18", "When Lainy's plan to settle down and start a family falls apart, she puts on a fake baby bump, tells a lie, and accidentally falls for her dream guy."),
("Heart Eyes", "https://upload.wikimedia.org/wikipedia/en/c/c0/Heart_Eyes_%282025%29_poster.jpg", "2025-03-20", "For the past several years, the 'Heart Eyes Killer' has wreaked havoc on Valentine's Day by stalking and murdering romantic couples. This Valentine's Day, no couple is safe.");
