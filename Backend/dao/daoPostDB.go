package dao

import "log"

func createPost(content string) error {

	// データベースに接続
	db := GetDB()

	// SQLクエリを準備
	query := "INSERT INTO posts (content) VALUES (?)"

	// SQLクエリを実行
	_, err := db.Exec(query, content)
	if err != nil {
		log.Println("Failed to insert post into database:", err)
		return err
	}

	// エラーがない場合、nilを返す
	return nil
}
