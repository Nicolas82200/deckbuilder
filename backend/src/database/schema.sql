DROP DATABASE IF EXISTS wyrdane;
CREATE DATABASE IF NOT EXISTS wyrdane CHARACTER SET utf8mb4;
USE wyrdane;

DROP TABLE IF EXISTS deck_cards;
DROP TABLE IF EXISTS decks;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  race VARCHAR(20) NOT NULL,
  card_type VARCHAR(20) NOT NULL,
  lane VARCHAR(10),
  cost INT,
  attack INT,
  hp INT,
  rarity VARCHAR(20),
  charges INT,
  effect TEXT,
  flavor TEXT,
  image_path TEXT,
  INDEX idx_cards_type (card_type),
  INDEX idx_cards_race (race),
  INDEX idx_cards_rarity (rarity)
);

CREATE TABLE decks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE deck_cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  deck_id INT NOT NULL,
  card_id INT NOT NULL,
  quantity INT DEFAULT 1,
  FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE,
  FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
  UNIQUE KEY unique_deck_card (deck_id, card_id)
);