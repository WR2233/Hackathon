package dao

import (
	"database/sql"
	"log"
)

func GetLikeNum(postID string) (int, error) {
	db, err := GetDB()
	if err != nil || db == nil {
		err := InitDB()
		if err != nil {
			log.Println("Failed to initialize database:", err)
			return 0, err
		}
		db, err = GetDB()
		if err != nil {
			return 0, err
		}
	}

	var count int
	query := "SELECT COUNT(*) FROM likes WHERE post_id = ?"
	row := db.QueryRow(query, postID)
	err = row.Scan(&count)
	if err != nil {
		if err == sql.ErrNoRows {
			return 0, nil // no likes found, return 0
		}
		return 0, err
	}
	return count, nil
}
