package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
)

func GetUserPosts() ([]model.Post, error) {
	var posts []model.Post
	db, err := GetDB()
	if err != nil {
		return posts, err
	}
	query := "SELECT p.post_id, p.content, u.username, u.deleted AS deleted_users, p.postedAt, p.edited AS editedAt, p.deleted AS deleted_posts, u.user_id FROM posts p JOIN users u ON p.user_id = u.user_id;"
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var post model.Post
		err := rows.Scan(&post.PostID, &post.Content, &post.UserName, &post.DeletedUser, &post.PostedAt, &post.Edited, &post.DeletedPost, &post.UserID)
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
