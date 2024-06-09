package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
)

func PostDB(postData model.PostPre) error {
	// データベースに接続
	db := GetDB()

	// SQLクエリを準備
	query := "INSERT INTO posts (content, user_id) VALUES (?, ?)"

	// SQLクエリを実行
	_, err := db.Exec(query, postData.Content, postData.UserID)
	if err != nil {
		log.Println("Failed to insert post into database:", err)
		return err
	}

	// エラーがない場合、nilを返す
	return nil
}
