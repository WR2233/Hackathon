package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
)

func GetFollowing(userID string) ([]model.User, error) {
	var users []model.User
	db, err := GetDB()
	if err != nil {
		return users, err
	}
	query := "SELECT f.following_id as followed_to_id, u.username, u.deleted, u.createdAt  FROM users u JOIN followers_following f ON u.user_id = f.following_id WHERE f.follower_id= ? ;"
	rows, err := db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var user model.User
		err := rows.Scan(&user.UserID, &user.UserName, &user.Deleted, &user.CreatedAt)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return users, nil
}
