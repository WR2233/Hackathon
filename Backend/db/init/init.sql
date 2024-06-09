DROP TABLE IF EXISTS users, posts, replies, likes, followers_following ;


CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  img CHAR(255),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  post_id INT  AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  postedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id  INT,
  edited BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE replies (
  reply_id INT  AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  postedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  postedBy_id INT NOT NULL,
  postedTo_id INT NOT NULL,
  edited BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE likes (
  like_id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT, 
  reply_id INT,
  likedBy_id INT NOT NULL
);

CREATE TABLE followers_following (
  relationship_id INT AUTO_INCREMENT PRIMARY KEY,
  follower_id INT,
  following_id INT
);

INSERT INTO users (username, deleted, img) VALUES
('Alice', false, 'alice.jpg'),
('Bob', false, 'bob.jpg'),
('Charlie', false, 'charlie.jpg'),
('David', false, 'david.jpg'),
('Eve', false, 'eve.jpg');

INSERT INTO posts (post_id, content, user_id) VALUES
('1', 'This is the first post.', 1),
('2', 'Second post here!', 2),
('3', 'Just posted something.', 3),
('4', 'Post number four.', 4),
('5', 'Fifth post.', 5);

INSERT INTO replies (reply_id, content, postedBy_id, postedTo_id) VALUES
(1, 'Replying to post 1.', 2, '1'),
(2, 'Got it!', 3, '2'),
(3, 'Nice post!', 4, '3'),
(4, 'Thanks!', 5, '4'),
(5, 'Great!', 1, '5');

INSERT INTO likes (post_id, likedBy_id) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 1);

INSERT INTO followers_following (follower_id, following_id) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 1);