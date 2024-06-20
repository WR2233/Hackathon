package dao

import (
	"log"
)

func GetLikeStatus(postreplyID string, userID string, IsPost bool) (bool, error) {
	db, err := GetDB()
	if err != nil {
		log.Println("Error getting DB:", err)
		return false, err
	}
	var liked bool
	if IsPost {
		query := "SELECT EXISTS(SELECT 1 FROM likes WHERE post_id = ? AND likedBy_id = ?)"
		err = db.QueryRow(query, postreplyID, userID).Scan(&liked)
		if err != nil {
			log.Println("Error checking like existence:", err)
			return false, err
		}
	} else {
		query := "SELECT EXISTS(SELECT 1 FROM likes WHERE reply_id = ? AND likedBy_id = ?)"
		err = db.QueryRow(query, postreplyID, userID).Scan(&liked)
		if err != nil {
			log.Println("Error checking like existence:", err)
			return false, err
		}
	}
	return liked, nil
}
