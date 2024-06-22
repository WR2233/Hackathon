package dao

import (
	"errors"
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
)

func CreatePost(postData model.PostPre) (int64, error) {
	// データベースに接続
	db, err := GetDB()
	if err != nil {
		return -1, err
	}
	if postData.VideoURL == "" && postData.ImgURL == "" {
		// SQLクエリを準備
		query := "INSERT INTO posts (content, user_id) VALUES (?, ?)"

		// SQLクエリを実行
		result, err := db.Exec(query, postData.Content, postData.UserID)
		if err != nil {
			log.Println("Failed to insert post into database:", err)
			return 0, err
		}

		// 新しく挿入されたレコードのIDを取得
		postID, err := result.LastInsertId()
		if err != nil {
			log.Println("Failed to get the last insert postID:", err)
			return 0, err
		}
		return postID, nil
	} else if postData.VideoURL != "" {
		// SQLクエリを準備
		query := "INSERT INTO posts (content, user_id, video) VALUES (?, ?, ?)"

		// SQLクエリを実行
		result, err := db.Exec(query, postData.Content, postData.UserID, postData.VideoURL)
		if err != nil {
			log.Println("Failed to insert post with video into database:", err)
			return 0, err
		}

		// 新しく挿入されたレコードのIDを取得
		postID, err := result.LastInsertId()
		if err != nil {
			log.Println("Failed to get the last insert postID:", err)
			return 0, err
		}
		return postID, nil
	} else if postData.ImgURL != "" {
		// SQLクエリを準備
		query := "INSERT INTO posts (content, user_id, img) VALUES (?, ?, ?)"

		// SQLクエリを実行
		result, err := db.Exec(query, postData.Content, postData.UserID, postData.ImgURL)
		if err != nil {
			log.Println("Failed to insert post with img into database:", err)
			return 0, err
		}

		// 新しく挿入されたレコードのIDを取得
		postID, err := result.LastInsertId()
		if err != nil {
			log.Println("Failed to get the last insert postID:", err)
			return 0, err
		}
		return postID, nil
	} else {
		return 0, errors.New("Invalid post data")
	}

}
