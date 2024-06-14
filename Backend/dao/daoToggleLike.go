package dao

import (
	"log"
)

func ToggleLike(postreplyID string, userID string, IsPost bool) (bool, error) {
	db, err := GetDB()
	if err != nil {
		log.Println("Error getting DB:", err)
		return false, err
	}

	var likeExists bool
	if IsPost {
		query := "SELECT EXISTS(SELECT 1 FROM likes WHERE post_id = ? AND likedBy_id = ?)"
		err = db.QueryRow(query, postreplyID, userID).Scan(&likeExists)
		if err != nil {
			log.Println("Error checking like existence:", err)
			return false, err
		}

		if likeExists {
			// Remove like
			query = "DELETE FROM likes WHERE post_id = ? AND likedBy_id = ?"
			_, err := db.Exec(query, postreplyID, userID)
			if err != nil {
				log.Println("Error deleting like:", err)
				return false, err
			}
			return false, nil
		} else {
			// Add like
			query = "INSERT INTO likes (post_id, likedBy_id) VALUES (?, ?)"
			_, err := db.Exec(query, postreplyID, userID)
			if err != nil {
				log.Println("Error inserting like:", err)
				return false, err
			}
			return true, nil
		}
	} else {
		query := "SELECT EXISTS(SELECT 1 FROM likes WHERE reply_id = ? AND likedBy_id = ?)"
		err = db.QueryRow(query, postreplyID, userID).Scan(&likeExists)
		if err != nil {
			log.Println("Error checking like existence:", err)
			return false, err
		}

		if likeExists {
			// Remove like
			query = "DELETE FROM likes WHERE reply_id = ? AND likedBy_id = ?"
			_, err := db.Exec(query, postreplyID, userID)
			if err != nil {
				log.Println("Error deleting like:", err)
				return false, err
			}
			return false, nil
		} else {
			// Add like
			query = "INSERT INTO likes (reply_id, likedBy_id) VALUES (?, ?)"
			_, err := db.Exec(query, postreplyID, userID)
			if err != nil {
				log.Println("Error inserting like:", err)
				return false, err
			}
			return true, nil
		}
	}

}
