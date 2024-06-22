package dao

import (
	"database/sql"
	"github.com/WR2233/Hackathon/Backend/model"
)

func GetPostsInf(page int) ([]model.Post, error) {
	var posts []model.Post
	limit := 10
	offset := (page - 1) * limit

	db, err := GetDB()
	if err != nil {
		return nil, err
	}
	query := "SELECT p.post_id, p.content, u.username, u.deleted AS deleted_users, p.postedAt, p.edited AS editedAt, p.deleted AS deleted_posts, u.user_id, u.img, p.video, p.img FROM posts p JOIN users u ON p.user_id = u.user_id ORDER BY p.postedAt DESC LIMIT 10 OFFSET ?;"
	rows, err := db.Query(query, offset)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var post model.Post
		var video sql.NullString
		var img sql.NullString
		err := rows.Scan(&post.PostID, &post.Content, &post.UserName, &post.DeletedUser, &post.PostedAt, &post.Edited, &post.DeletedPost, &post.UserID, &post.Img, &video, &img)
		if err != nil {
			return nil, err
		}

		if video.Valid {
			post.Video = video.String
		} else {
			post.Video = ""
		}

		if img.Valid {
			post.ImgPost = img.String
		} else {
			post.ImgPost = ""
		}

		posts = append(posts, post)
	}
	return posts, nil
}
