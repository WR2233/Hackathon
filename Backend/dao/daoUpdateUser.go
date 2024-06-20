package dao

import "fmt"

func UpdateUser(UID string, NewName string) error {
	db, err := GetDB()
	if err != nil {
		return fmt.Errorf("failed to get DB connection: %w", err)
	}

	query := "UPDATE users SET username=? WHERE user_id=?"
	_, err = db.Exec(query, NewName, UID)
	if err != nil {
		return fmt.Errorf("failed to execute update query: %w", err)
	}

	return nil
}
