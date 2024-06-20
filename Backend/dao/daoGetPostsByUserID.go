package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
)

func GetPostsByUserID(userID string) ([]model.Post, error) {
	var posts []model.Post
	query := "SELECT p.post_id, p.content, u.username, u.deleted AS deleted_users, p.postedAt, p.edited AS editedAt, p.deleted AS deleted_posts, u.user_id, u.img FROM posts p JOIN users u ON p.user_id = u.user_id WHERE u.user_id = ?"
	rows, err := db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var post model.Post
		err := rows.Scan(&post.PostID, &post.Content, &post.UserName, &post.DeletedUser, &post.PostedAt, &post.Edited, &post.DeletedPost, &post.UserID, &post.Img)
		if err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}
	return posts, nil
}
