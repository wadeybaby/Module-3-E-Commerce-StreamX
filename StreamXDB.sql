CREATE DATABASE  IF NOT EXISTS `streamx_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `streamx_db`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: streamx_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `movie_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (3,1,2,1),(4,2,10,1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coming_soon`
--

DROP TABLE IF EXISTS `coming_soon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coming_soon` (
  `soon_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `img_link` varchar(255) DEFAULT NULL,
  `release_date` date NOT NULL,
  `description` text,
  PRIMARY KEY (`soon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coming_soon`
--

LOCK TABLES `coming_soon` WRITE;
/*!40000 ALTER TABLE `coming_soon` DISABLE KEYS */;
INSERT INTO `coming_soon` VALUES (1,'Flight Risk','https://upload.wikimedia.org/wikipedia/en/e/e2/Flight_risk_2024.jpg','2025-03-11','A pilot transports an Air Marshal accompanying a fugitive to trial. As they cross the Alaskan wilderness, tensions soar and trust is tested, as not everyone on board is who they seem.'),(2,'Captain America: Brave New World','https://upload.wikimedia.org/wikipedia/en/a/a4/Captain_America_Brave_New_World_poster.jpg','2025-03-13','Sam Wilson, the new Captain America, finds himself in the middle of an international incident and must discover the motive behind a nefarious global plan.'),(3,'The Gorge','https://upload.wikimedia.org/wikipedia/en/d/dc/The_Gorge_%28film%29_poster.jpg','2025-03-15','Two highly-trained operatives become close after being sent to protect opposite sides of a mysterious gorge. When an evil emerges, they must work together to survive what lies within.'),(4,'Companion','https://upload.wikimedia.org/wikipedia/en/4/48/Companion_film_poster.jpg','2025-03-18','A weekend getaway with friends at a remote cabin turns into chaos after it\'s revealed that one of the guests is not what they seem.'),(5,'Kinda Pregnant','https://upload.wikimedia.org/wikipedia/en/e/ee/Kinda_Pregnant.jpg','2025-03-18','When Lainy\'s plan to settle down and start a family falls apart, she puts on a fake baby bump, tells a lie, and accidentally falls for her dream guy.'),(6,'Heart Eyes','https://upload.wikimedia.org/wikipedia/en/c/c0/Heart_Eyes_%282025%29_poster.jpg','2025-03-20','For the past several years, the \'Heart Eyes Killer\' has wreaked havoc on Valentine\'s Day by stalking and murdering romantic couples. This Valentine\'s Day, no couple is safe.');
/*!40000 ALTER TABLE `coming_soon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `movie_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `year_released` int DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `rental_price` decimal(10,2) NOT NULL,
  `trailer_url` varchar(250) NOT NULL,
  `img_link` varchar(250) NOT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Journey 2','A young adventurer teams up with a seasoned explorer on a thrilling expedition to the mysterious island of Atlantis.',2012,94,29.99,'https://player.vimeo.com/video/1058973949?h=cd29e5d448&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','https://upload.wikimedia.org/wikipedia/en/8/8e/Journey_2_Poster.jpg'),(2,'Joker: Folie à Deux','A troubled comedian\'s descent into madness leads him to becoming the infamous villain, the Joker.',2024,138,49.99,'https://player.vimeo.com/video/1058973880?h=51d0b7cb17&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','https://upload.wikimedia.org/wikipedia/en/e/e8/Joker_-_Folie_%C3%A0_Deux_poster.jpg'),(3,'Diary of a Mad Black Woman','After being married for 18 years, Helen\'s husband divorces her for another woman. Heartbroken, she moves in with her sassy grandmother who helps her overcome the trauma.',2005,116,50.00,'https://player.vimeo.com/video/1058974418?h=a7a1f307a0&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','https://upload.wikimedia.org/wikipedia/en/8/87/Diaryofamadblackwoman_poster.jpg'),(4,'Mufasa: The Lion King','A prequel to The Lion King, this film tells the backstory of Mufasa’s rise to greatness.',2024,120,70.00,'https://player.vimeo.com/video/1058974224?h=7f729b316b&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','https://upload.wikimedia.org/wikipedia/en/0/0b/Mufasa_The_Lion_King_Movie_2024.jpeg'),(5,'Me Before You','Me Before You is a romantic drama about a young caregiver who forms an unexpected bond with a paralyzed man, challenging both of their perspectives on life and love.',2016,110,30.00,'https://player.vimeo.com/video/1058974083?h=e4e865a380&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','https://upload.wikimedia.org/wikipedia/en/e/e0/Me_Before_You.jpg'),(7,'Joker: Folie à Deux','A troubled comedian\'s descent into madness leads him to becoming the infamous villain, the Joker.',2024,138,49.99,'https://player.vimeo.com/video/1058973880?h=51d0b7cb17&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','https://upload.wikimedia.org/wikipedia/en/e/e8/Joker_-_Folie_%C3%A0_Deux_poster.jpg'),(8,'Diary of a Mad Black Woman','After being married for 18 years, Helen\'s husband divorces her for another woman. Heartbroken, she moves in with her sassy grandmother who helps her overcome the trauma.',2005,116,50.00,'https://player.vimeo.com/video/1058974418?h=a7a1f307a0&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','https://upload.wikimedia.org/wikipedia/en/8/87/Diaryofamadblackwoman_poster.jpg'),(10,'Me Before You','Me Before You is a romantic drama about a young caregiver who forms an unexpected bond with a paralyzed man, challenging both of their perspectives on life and love.',2016,110,30.00,'https://player.vimeo.com/video/1058974083?h=e4e865a380&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','https://upload.wikimedia.org/wikipedia/en/e/e0/Me_Before_You.jpg'),(11,'Smile','Smile is a psychological horror film about a therapist who begins experiencing terrifying supernatural occurrences after witnessing a patient\'s traumatic suicide, leading her to uncover a dark and deadly curse.',2022,115,40.00,'https://player.vimeo.com/video/1058974290?h=b5083adeea&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','https://upload.wikimedia.org/wikipedia/en/7/7f/Smile_%282022_film%29.jpg'),(12,'Moana 2','Moana 2 follows Moana on a brand-new adventure across the vast seas, where she reunites with Maui and embarks on an epic journey to discover new lands and face unforeseen challenges beyond the horizon.',2024,100,60.00,'https://player.vimeo.com/video/1058974150?h=8e2c122459&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','https://upload.wikimedia.org/wikipedia/en/7/73/Moana_2_poster.jpg'),(13,'The Marvels','The Marvels follows Carol Danvers (Captain Marvel) as she teams up with Kamala Khan (Ms. Marvel) and Monica Rambeau after their powers become mysteriously intertwined. Together, they must work as a team to face a new cosmic threat and restore balance to the universe.',2023,105,40.00,'https://player.vimeo.com/video/1058974022?h=bc12a25ff7&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','https://upload.wikimedia.org/wikipedia/en/7/7a/The_Marvels_poster.jpg'),(14,'Spider-Man: No Way Home','Spider-Man seeks the help of Doctor Strange to forget his exposed secret identity as Peter Parker. However, Strange\'s spell goes horribly wrong, leading to unwanted guests entering their universe.',2021,148,80.00,'https://player.vimeo.com/video/1058974339?h=53af1dee45&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479','https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `payment_method` enum('Credit/Debit Card') NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `user_id` (`user_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `user_role` enum('admin','user') NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user01','$2b$10$LWFRtLgkLp9C0uD3m3dX/eRPGOxf9ttAFf3zbgunmiaqgQrBpNRRS','user','user01@gmail.com','0835626658'),(2,'admin','$2b$10$rGbAIDcSSUTEQ1IB3FOQX.Zp36nVV590HHty8nnQQlz7kb56R4YYu','admin','admin@StreamX.com','12345678');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-18 16:16:11
