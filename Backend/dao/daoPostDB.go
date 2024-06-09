package dao

import "log"

type Post_pre struct {
	Content  string `json:"Content"`
	PostedAt string `json:"PostedAt"`
	UserID   int    `json:"UserID"`
}

func PostDB(postData Post_pre) error {
	// データベースに接続
	db := GetDB()

	// SQLクエリを準備
	query := "INSERT INTO posts (content, postedAt, user_id) VALUES (?, ?, ?)"

	// SQLクエリを実行
	_, err := db.Exec(query, postData.Content, postData.PostedAt, postData.UserID)
	if err != nil {
		log.Println("Failed to insert post into database:", err)
		return err
	}

	// エラーがない場合、nilを返す
	return nil
}
