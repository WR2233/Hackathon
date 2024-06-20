package dao

import "fmt"

func DeleteUser(UID string) error {
	db, err := GetDB()
	if err != nil {
		return fmt.Errorf("failed to get DB connection: %w", err)
	}

	query := "UPDATE users SET deleted=true WHERE user_id=?"
	_, err = db.Exec(query, UID)
	if err != nil {
		return fmt.Errorf("failed to execute delete user: %w", err)
	}

	return nil
}
