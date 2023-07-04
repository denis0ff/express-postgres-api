CREATE TABLE
    IF NOT EXISTS meetups (
        id SERIAL PRIMARY KEY,
        title VARCHAR(60),
        description VARCHAR(600),
        time VARCHAR(30),
        tags VARCHAR(30) []
    );
CREATE TABLE
    IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(32),
        password VARCHAR(64)
    );