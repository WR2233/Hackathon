package dao

import (
	"database/sql"
	"github.com/WR2233/Hackathon/Backend/model"
)

// 投稿の詳細情報を取得するハンドラー

func GetAPost(post_id int) (*model.Post, error) {
	db, err := GetDB()
	if err != nil {
		return nil, err
	}

	query := "SELECT p.post_id, p.content, u.username, u.deleted AS deleted_users, p.postedAt, p.edited AS editedAt, p.deleted AS deleted_posts, u.user_id, u.img, p.video, p.img FROM posts p JOIN users u ON p.user_id = u.user_id WHERE p.post_id = ?"

	row := db.QueryRow(query, post_id)

	// 結果セットから投稿をスキャンして取得する
	var post model.Post
	var video sql.NullString
	var img sql.NullString

	err = row.Scan(&post.PostID, &post.Content, &post.UserName, &post.DeletedUser, &post.PostedAt, &post.Edited, &post.DeletedPost, &post.UserID, &post.Img, &video, &img)

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
	return &post, nil
}
