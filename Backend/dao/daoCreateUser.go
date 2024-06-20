package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
)

func CreateUser(userData model.UserPre) error {
	// データベースに接続
	db, err := GetDB()
	if err != nil {
		return err
	}
	// SQLクエリを準備
	query := "INSERT INTO users (user_id, username, img) VALUES (?, ?, ?)"

	default_img := "https://firebasestorage.googleapis.com/v0/b/hackathon-d62a0.appspot.com/o/images%2F1036.png?alt=media&token=5aeb70f6-1eab-4dec-ab81-557cee22d283"

	// SQLクエリを実行
	_, err = db.Exec(query, userData.UserID, userData.UserName, default_img)
	if err != nil {
		log.Println("Failed to insert userData into database:", err)
		return err
	}

	// エラーがない場合、nilを返す
	return nil
}
