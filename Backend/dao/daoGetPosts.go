package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
)

func GetPosts() ([]model.Post, error) {
	var posts []model.Post
	db := GetDB()
	rows, err := db.Query("SELECT post_id, content, user_id, edited FROM posts")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var post model.Post
		err := rows.Scan(&post.post_id, &post.content, &post.user_id, &post.edited)
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
