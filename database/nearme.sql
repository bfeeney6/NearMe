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
