package dao

import (
	"log"
)

func UnFollowUser(byid string, toid string) error {
	// データベースに接続
	db := GetDB()

	// SQLクエリを準備
	query := "delete FROM followers_following WHERE follower_id = ? AND following_id= ?"

	// SQLクエリを実行
	_, err := db.Exec(query, byid, toid)
	if err != nil {
		log.Println("Failed to unfollow into database:", err)
		return err
	}

	return err
}
