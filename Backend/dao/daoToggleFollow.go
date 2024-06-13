package dao

import "log"

func ToggleFollow(FollowedToID string, FollowedByID string) (bool, error) {
	db, err := GetDB()
	if err != nil {
		log.Println("Error getting DB:", err)
		return false, err
	}

	var followExists bool
	query := "SELECT EXISTS(SELECT 1 FROM followers_following WHERE follower_id= ? AND following_id=?)"
	err = db.QueryRow(query, FollowedByID, FollowedToID).Scan(&followExists)

	if err != nil {
		log.Println(err)
		return false, err
	}

	if followExists {
		// Remove like
		query = "DELETE FROM followers_following WHERE follower_id= ? AND following_id=?"
		_, err := db.Exec(query, FollowedByID, FollowedToID)
		if err != nil {
			log.Println("Error deleting follow:", err)
			return false, err
		}
		return false, nil

	} else {
		// Add like
		query = "followers_following (follower_id, following_id)VALUES (?, ?)"
		_, err := db.Exec(query, FollowedByID, FollowedToID)
		if err != nil {
			log.Println("Error inserting follow:", err)
			return false, err
		}
		return true, nil
	}
}
