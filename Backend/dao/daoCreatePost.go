package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
)

func createPost(postData model.PostPre) (int64, error) {
	// データベースに接続
	db := GetDB()

	// SQLクエリを準備
	query := "INSERT INTO posts (content, user_id) VALUES (?, ?)"

	// SQLクエリを実行
	result, err := db.Exec(query, postData.Content, postData.UserID)
	if err != nil {
		log.Println("Failed to insert post into database:", err)
		return 0, err
	}
	postID, err := result.LastInsertId()

	// エラーがない場合、nilを返す
	return postID, nil
}
