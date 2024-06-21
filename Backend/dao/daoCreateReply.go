package dao

import (
	"errors"
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
)

func CreateReply(replyData model.ReplyPre) (int64, error) {
	//データベース接続
	db, err := GetDB()
	if err != nil {
		return -1, err
	}
	if replyData.VideoURL == "" && replyData.ImgURL == "" {
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
	} else if replyData.VideoURL != "" {
		query := "INSERT INTO replies (postedTo_id, postedBy_id, content, isToPost, Video) VALUES (?, ?, ?, ?, ?)"

		result, err := db.Exec(query, replyData.PostReplyID, replyData.UserID, replyData.Content, replyData.IsToPost, replyData.VideoURL)
		if err != nil {
			log.Println("Failed to insert reply with video into database: ", err)
			return -1, err
		}
		ReplyID, err := result.LastInsertId()
		if err != nil {
			log.Println("Failed to get the last inserted replyID: ", err)
			return -1, err
		}
		log.Println("Successfully inserted replyID: ", ReplyID)
		return ReplyID, nil
	} else if replyData.ImgURL != "" {
		query := "INSERT INTO replies (postedTo_id, postedBy_id, content, isToPost, img) VALUES (?, ?, ?, ?, ?)"

		result, err := db.Exec(query, replyData.PostReplyID, replyData.UserID, replyData.Content, replyData.IsToPost, replyData.ImgURL)
		if err != nil {
			log.Println("Failed to insert reply with img into database: ", err)
			return -1, err
		}
		ReplyID, err := result.LastInsertId()
		if err != nil {
			log.Println("Failed to get the last inserted replyID: ", err)
			return -1, err
		}
		log.Println("Successfully inserted replyID: ", ReplyID)
		return ReplyID, nil
	} else {
		return 0, errors.New("Invalid reply data")
	}
}
