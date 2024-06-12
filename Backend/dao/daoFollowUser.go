package dao

import (
	"log"
)

func FollowUser(Followedbyid string, Followedtoid string) error {
	// データベースに接続
	db, err := GetDB()
	if err != nil {
		log.Println("Failed to connect to database:", err)
		return err
	}
	defer db.Close()
	log.Printf("Followed by %s to %s", Followedbyid, Followedtoid)
	// SQLクエリを準備
	query := "INSERT INTO followers_following (follower_id, following_id) VALUES (?, ?)"

	// SQLクエリを実行
	_, err = db.Exec(query, Followedbyid, Followedtoid)
	if err != nil {
		log.Println("Failed to follow into database:", err)
		return err
	}

	return nil
}
