package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
)

const Post = model.Post

func GetPosts() ([]Post, error) {
	var posts []Post
	db := GetDB()
	rows, err := db.Query("SELECT post_id, content, user_id, edited FROM posts")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var post Post
		err := rows.Scan(&post.ID, &post.Content, &post.UserID, &post.Edited)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return posts, nil
}
