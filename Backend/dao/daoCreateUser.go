package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
)

func CreateUser(userData model.UserPre) error {
	// データベースに接続
	db := GetDB()
	// SQLクエリを準備
	query := "INSERT INTO users (user_id, username) VALUES (?, ?)"

	// SQLクエリを実行
	_, err := db.Exec(query, userData.UserID, userData.UserName)
	if err != nil {
		log.Println("Failed to insert userData into database:", err)
		return err
	}

	// エラーがない場合、nilを返す
	return nil
}
