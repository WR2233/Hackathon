package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
)

func CreateReply(replyData model.ReplyPre) (int64, error) {
	//データベース接続
	db, err := GetDB()
	if err != nil {
		return -1, err
	}

	query := "INSERT INTO replies (postedTo_id, postedBy_id, content, isToPost) VALUES (?, ?, ?, ?)"

	result, err := db.Exec(query, replyData.PostReplyID, replyData.UserID, replyData.Content, replyData.IsToPost)
	if err != nil {
		log.Println("Failed to insert reply into database: ", err)
		return -1, err
	}
	ReplyID, err := result.LastInsertId()
	if err != nil {
		log.Println("Failed to get the last inserted replyID: ", err)
		return -1, err
	}
	log.Println("Successfully inserted replyID: ", ReplyID)
	return ReplyID, nil
}
