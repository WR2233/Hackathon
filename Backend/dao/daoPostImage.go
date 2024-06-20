package dao

import (
	"log"
)

func PostImage(url string, uid string) error {
	// データベースに接続
	db, err := GetDB()
	if err != nil {
		return err
	}

	// SQLクエリを準備
	query := "UPDATE  users SET img=? WHERE user_id=?"

	// SQLクエリを実行
	_, err = db.Exec(query, url, uid)
	if err != nil {
		log.Println("Failed to update image into database:", err)
		return err
	}
	return nil
}
