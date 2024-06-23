DROP TABLE IF EXISTS users, posts, replies, likes, followers_following ;

CREATE TABLE users (
  user_id VARCHAR(50)  PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  img CHAR(255),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  post_id INT  AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  postedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id  VARCHAR(50) NOT NULL ,
  edited BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  img VARCHAR(100),
  video VARCHAR(100)
);

CREATE TABLE replies (
  reply_id INT  AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  postedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  postedBy_id VARCHAR(50) NOT NULL,
  postedTo_id INT NOT NULL,
  edited BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  isToPost BOOLEAN NOT NULL,
);

CREATE TABLE likes (
  like_id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT, 
  reply_id INT,
  likedBy_id VARCHAR(50) NOT NULL
);

CREATE TABLE followers_following (
  relationship_id INT AUTO_INCREMENT PRIMARY KEY,
  follower_id VARCHAR(50),
  following_id VARCHAR(50)
);

INSERT INTO users (username, deleted, img, user_id) VALUES
('Alice', false, 'alice.jpg', "a"),
('Bob', false, 'bob.jpg', "b"),
('Charlie', false, 'charlie.jpg',"c"),
('David', false, 'david.jpg',"d"),
('Eve', false, 'eve.jpg',"e");

INSERT INTO posts (post_id, content, user_id) VALUES
('1', 'This is the first post.', "a"),
('2', 'Second post here!', "b"),
('3', 'Just posted something.', "c"),
('4', 'Post number four.', "d"),
('5', 'Fifth post.', "e");

INSERT INTO replies (reply_id, content, postedBy_id, postedTo_id) VALUES
(1, 'Replying to post 1.', "a", '1'),
(2, 'Got it!',"b", '2'),
(3, 'Nice post!', "c", '3'),
(4, 'Thanks!', "d", '4'),
(5, 'Great!', "e", '5');

INSERT INTO likes (post_id, likedBy_id) VALUES
(1,"b"),
(2, "b"),
(3, "c"),
(4, "d"),
(5, "a");

INSERT INTO followers_following (follower_id, following_id) VALUES
("a","b"),
("e","b"),
("c","b"),
("a","c"),
("a","d");