package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
)

// 投稿の詳細情報を取得するハンドラー

func GetPost(post_id int) (*model.Post, error) {
	db := GetDB()
	defer db.Close()

	row, err := db.Query("SELECT post_id, content, user_id, edited, posetdAt, deleted  FROM posts WHERE post_id =?", post_id)
	if err != nil {
		return nil, err
	}

	// 結果セットから投稿をスキャンして取得する
	var post model.Post
	err = row.Scan(&post.PostID, &post.Content, &post.PostedAt, &post.UserID, &post.Edited, &post.Deleted)
	if err != nil {
		return nil, err
	}

	return &post, nil
}
