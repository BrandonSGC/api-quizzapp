# Database Table Creation Scripts

## Users Table

```sql
CREATE TABLE "Users" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    surname VARCHAR(30) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL
);
```

## Quizzes Table

```sql
CREATE TABLE "Quizzes" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id INT,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "Users"(id)
);
```

## Questions Table

```sql
CREATE TABLE "Questions" (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    quiz_id INT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES "Quizzes"(id)
);
```

## Options Table

```sql
CREATE TABLE "Options" (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    description TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    FOREIGN KEY (question_id) REFERENCES "Questions"(id)
);
```

## Insert admin user example.

```sql
INSERT INTO "Users" (name, surname, email, username, password) 
VALUES ('Admin', 'User', 'admin@example.com', 'admin', 'root');
```

## Create Quiz

```sql
INSERT INTO "Quizzes" (name, image_url) 
VALUES ('Frontend Quiz', 'https://res.cloudinary.com/dz209s6jk/image/upload/v1700100665/Screenshots/lwqznasieduo5oq8tijw.jpg');

INSERT INTO "Questions" (description, quiz_id) 
VALUES ('What is JSX in React?', 1);

INSERT INTO "Options" (question_id, description, is_correct) 
VALUES (1, 'JavaScript XML', '1'),
	   (1, 'JavaScript Extension', '0'),
	   (1, 'JavaScript Execute', '0');
```
