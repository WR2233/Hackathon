package dao

import (
	"database/sql"
	"github.com/WR2233/Hackathon/Backend/model"
)

// userの詳細情報を取得するハンドラー

func GetUser(user_id string) (*model.User, error) {
	db, err := GetDB()
	if err != nil {
		return nil, err
	}

	//user情報取得
	query_get_user := "SELECT user_id, username, deleted, createdAt, img FROM users WHERE user_id = ?"
	var user model.User
	row := db.QueryRow(query_get_user, user_id)

	// 結果セットから投稿をスキャンして取得する
	err = row.Scan(&user.UserID, &user.UserName, &user.Deleted, &user.CreatedAt, &user.Img)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		} else {
			return nil, err
		}
	}

	return &user, nil
}
