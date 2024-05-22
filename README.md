# Database Table Creation Scripts

## Users Table

```sql
CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    surname VARCHAR(30) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);
```

## Quizzes Table

```sql
CREATE TABLE "Quizzes" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id INT,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "Users" (id) ON DELETE CASCADE
);
```

## Questions Table

```sql
CREATE TABLE "Questions" (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    quiz_id INT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES "Quizzes"(id) ON DELETE CASCADE
);
```

## Options Table

```sql
CREATE TABLE "Options" (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    description TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    FOREIGN KEY (question_id) REFERENCES "Questions"(id) ON DELETE CASCADE
);
```

## Insert admin user example.

```sql
INSERT INTO "Users" (name, surname, email, username, password) 
VALUES ('Admin', 'User', 'admin@example.com', 'admin', 'root');
```

## Create Quiz

```sql
-- CREATE DEFAULT QUIZZES
-- React Quiz
INSERT INTO "Quizzes" (name, image_url) 
VALUES ('React Quiz', '"http://localhost:3000/images/react.svg"');

-- Node.js Quiz
INSERT INTO "Quizzes" (name, image_url) 
VALUES ('Node.js Quiz', '"http://localhost:3000/images/nodejs.svg"');

-- PostgreSQL Quiz
INSERT INTO "Quizzes" (name, image_url) 
VALUES ('PostgreSQL Quiz', '"http://localhost:3000/images/html.svg"');


-- Create Questions for React Quiz
INSERT INTO "Questions" (description, quiz_id) 
VALUES ('What is JSX in React?', 1),
       ('What is a state in React?', 1),
       ('What is a prop in React?', 1);

-- Create Options for React Quiz
INSERT INTO "Options" (question_id, description, is_correct) 
VALUES (1, 'JavaScript XML', '1'),
       (1, 'JavaScript Extension', '0'),
       (1, 'JavaScript Execute', '0'),
       (2, 'An object that represents the part of the application`s state', '1'),
       (2, 'A function used to change the applications state', '0'),
       (2, 'A variable that holds the data to be rendered', '0'),
       (3, 'A shorthand for properties', '1'),
       (3, 'A method to manipulate the DOM', '0'),
       (3, 'A way to define HTML elements in JavaScript', '0');

-- Create Questions for Node.js Quiz
INSERT INTO "Questions" (description, quiz_id) 
VALUES ('What is Node.js?', 2),
       ('What is npm?', 2),
       ('What is a callback function?', 2);

-- Create Options for Node.js Quiz
INSERT INTO "Options" (question_id, description, is_correct) 
VALUES (4, 'A JavaScript runtime built on Chromes V8 JavaScript engine', '1'),
       (4, 'A front-end JavaScript framework', '0'),
       (4, 'A server-side rendering framework', '0'),
       (5, 'Node Package Manager', '1'),
       (5, 'Node Process Manager', '0'),
       (5, 'Node Package Module', '0'),
       (6, 'A function passed as an argument to another function to be executed later', '1'),
       (6, 'A function that is executed immediately', '0'),
       (6, 'A function that executes a loop', '0');

-- Create Questions for PostgreSQL Quiz
INSERT INTO "Questions" (description, quiz_id) 
VALUES ('What is PostgreSQL?', 3),
       ('What is a table in PostgreSQL?', 3),
       ('What is a primary key?', 3);

-- Create Options for PostgreSQL Quiz
INSERT INTO "Options" (question_id, description, is_correct) 
VALUES (7, 'A powerful, open-source object-relational database system', '1'),
       (7, 'A programming language', '0'),
       (7, 'A web server', '0'),
       (8, 'A collection of related data stored in rows and columns', '1'),
       (8, 'A JavaScript library', '0'),
       (8, 'A function in PostgreSQL', '0'),
       (9, 'A column or set of columns that uniquely identifies each row in a table', '1'),
       (9, 'A constraint for enforcing uniqueness in a column or set of columns', '0'),
       (9, 'A foreign key constraint', '0');
```
