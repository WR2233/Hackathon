package dao

import (
	"errors"
)

func DeletePostReply(postreplyID int, IsPost bool) error {
	db, err := GetDB()
	if err != nil {
		return err
	}

	// 削除する投稿が存在するか確認
	var exists bool
	if IsPost {
		err = db.QueryRow("SELECT EXISTS(SELECT 1 FROM posts WHERE post_id = ?)", postreplyID).Scan(&exists)
		if err != nil {
			return err
		}
		if !exists {
			return errors.New("post not found")
		}

		// 投稿を削除

		_, err = db.Exec("UPDATE posts SET deleted=true WHERE post_id=?", postreplyID)
		if err != nil {
			return err
		}

		return nil
	} else {
		err = db.QueryRow("SELECT EXISTS(SELECT 1 FROM replies WHERE reply_id = ?)", postreplyID).Scan(&exists)
		if err != nil {
			return err
		}
		if !exists {
			return errors.New("reply not found")
		}

		// replyを削除

		_, err = db.Exec("UPDATE replies SET deleted=true WHERE reply_id=?", postreplyID)
		if err != nil {
			return err
		}
		return nil
	}
}
