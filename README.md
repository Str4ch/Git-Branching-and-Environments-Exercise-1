# Git-Branching-and-Environments-Exercise-1

## Requirements

```NodeJS``` and ```npm``` installed.

```express``` ```pg``` ```dotenv``` ```nodemon```.

## How to set up project

```npm init -y```

```npm install express pg dotenv```

```npm install --save-dev nodemon```

```npm run start```

## How to use

File ```config/dbConf.js``` is storing all configurations to connect to the database. 

By default the programm is using "dev" configuration but you can add .env file with property ```NODE_ENV='your_config'``` to use your own configuration.

To start programm run ```npm run start``` and go to http://localhost:3000 to see if it works.

## How to configure database

```
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT,
    grade VARCHAR(5),
    email VARCHAR(100)
);
```

also you can add some test data

```
INSERT INTO students (first_name, last_name, age, grade, email) VALUES
('Alice', 'Johnson', 20, 'A', 'alice.johnson@example.com'),
('Bob', 'Smith', 22, 'B', 'bob.smith@example.com'),
('Charlie', 'Brown', 19, 'C', 'charlie.brown@example.com'),
('Diana', 'Prince', 21, 'A', 'diana.prince@example.com'),
('Ethan', 'Hunt', 23, 'B', 'ethan.hunt@example.com'),
('Fiona', 'Gallagher', 20, 'C', 'fiona.gallagher@example.com'),
('George', 'Michaels', 24, 'D', 'george.michaels@example.com'),
('Hannah', 'Montana', 18, 'A', 'hannah.montana@example.com'),
('Ian', 'Curtis', 25, 'B', 'ian.curtis@example.com'),
('Julia', 'Roberts', 22, 'A', 'julia.roberts@example.com');
```

