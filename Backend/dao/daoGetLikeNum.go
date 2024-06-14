package dao

import (
	"database/sql"
)

func GetLikeNum(postreplyID string, IsPost bool) (int, error) {
	db, err := GetDB()
	if err != nil {
		return -1, err
	}
	var count int
	if IsPost == true {
		query := "SELECT COUNT(*) FROM likes WHERE post_id = ?"
		row := db.QueryRow(query, postreplyID)
		err = row.Scan(&count)
		if err != nil {
			if err == sql.ErrNoRows {
				return 0, nil // no likes found, return 0
			}
			return 0, err
		}
		return count, nil
	} else {
		query := "SELECT COUNT(*) FROM likes WHERE reply_id = ?"
		row := db.QueryRow(query, postreplyID)
		err = row.Scan(&count)
		if err != nil {
			if err == sql.ErrNoRows {
				return 0, nil // no likes found, return 0
			}
			return 0, err
		}
		return count, nil
	}
}
