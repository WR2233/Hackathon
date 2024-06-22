package dao

import (
	"log"
)

func GetFollowStatus(FollowedByID string, FollowedToID string) (bool, error) {
	db, err := GetDB()
	if err != nil {
		log.Println("Error getting DB:", err)
		return false, err
	}
	var followed bool

	query := "SELECT EXISTS(SELECT 1 FROM followers_following WHERE follower_id = ? AND following_id = ?)"

	err = db.QueryRow(query, FollowedByID, FollowedToID).Scan(&followed)
	if err != nil {
		log.Println("Error checking follow existence:", err)
		return false, err
	}

	return followed, nil
}
