package dao

import (
	"fmt"
	"github.com/WR2233/Hackathon/Backend/model"
)

func UpdatePost(newPost model.UpdatePost) error {
	db, err := GetDB()
	if err != nil {
		return fmt.Errorf("failed to get DB connection: %w", err)
	}

	query := "UPDATE posts SET content=?, edited=true WHERE post_id=?"
	_, err = db.Exec(query, newPost.Content, newPost.PostID)
	if err != nil {
		return fmt.Errorf("failed to execute update query: %w", err)
	}

	return nil
}
