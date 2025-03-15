-- Release 1

-- Drop the database if it exists
DROP DATABASE IF EXISTS nearme;

-- Create the database
CREATE DATABASE nearme;

-- Use the database for the fitness app
USE nearme;

-- Delete any tables which currently exist in the app's database
DROP TABLE IF EXISTS Profile;

-- Create a table which contains all body part records
CREATE TABLE Profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    interests VARCHAR (50),
    aboutMe VARCHAR (200),
    livingLocation VARCHAR (200),
    bio VARCHAR (300),
    notifications BOOLEAN,
    privacy VARCHAR (50)
);

CREATE TABLE BusinessOffers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (50),
    offerTime TIMESTAMP
);

CREATE TABLE Events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR (200),
    interest VARCHAR (200),
    startDate DATE,
    endDate DATE
);

CREATE TABLE Friends (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    activity VARCHAR(255) NOT NULL,
    age INT CHECK (age >= 0),
    type ENUM('group', 'individual') NOT NULL
    -- not sure how ids would really work on this screen
);

CREATE TABLE LocalPosts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_text TEXT NOT NULL, 
    posted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    -- picture VARCHAR(255),  not sure if we bother with pictures 
);

