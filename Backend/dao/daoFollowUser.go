package dao

import (
	"log"
)

func FollowUser(byid string, toid string) error {
	// データベースに接続
	db := GetDB()

	// SQLクエリを準備
	query := "INSERT INTO followers_following (follower_id, following_id) VALUES (?, ?)"

	// SQLクエリを実行
	_, err := db.Exec(query, byid, toid)
	if err != nil {
		log.Println("Failed to follow into database:", err)
		return err
	}

	return err
}
