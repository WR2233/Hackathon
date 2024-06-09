package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
)

// 投稿の詳細情報を取得するハンドラー

func GetPost(post_id int) (*model.Post, error) {
	db := GetDB()

	row := db.QueryRow("SELECT post_id, content,  postedAt,user_id, edited, deleted  FROM posts WHERE post_id =?", 1)

	// 結果セットから投稿をスキャンして取得する
	var post model.Post
	err := row.Scan(&post.PostID, &post.Content, &post.PostedAt, &post.UserID, &post.Edited, &post.Deleted)
	if err != nil {
		return nil, err
	}

	return &post, nil
}
