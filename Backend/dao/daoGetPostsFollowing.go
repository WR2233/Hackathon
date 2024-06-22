package dao

import (
	"database/sql"
	"github.com/WR2233/Hackathon/Backend/model"
)

func GetPostsFollowing(userID string) ([]model.Post, error) {
	var posts []model.Post
	db, err := GetDB()
	if err != nil {
		return posts, err
	}
	query := "SELECT posts.post_id, posts.content,  users.username ,users.deleted, posts.postedAt, posts.edited, posts.deleted, posts.user_id, users.img, posts.video, posts.img  FROM posts INNER JOIN followers_following ON posts.user_id = followers_following.following_id INNER JOIN users ON posts.user_id = users.user_id WHERE followers_following.follower_id = ? ORDER BY posts.postedAt DESC;"
	rows, err := db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
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
