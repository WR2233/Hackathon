package dao

import (
	"database/sql"
	"github.com/WR2233/Hackathon/Backend/model"
)

// replyの詳細情報を取得する

func GetAReply(reply_id int) (*model.Reply, error) {
	db, err := GetDB()
	if err != nil {
		return nil, err
	}

	query := "SELECT r.reply_id, r.content, r.postedAt , r.postedBy_id, r.postedTo_id, r.edited AS editedAt, r.deleted AS deleted_reply, u.username, u.deleted, r.IsToPost, u.img, r.video, r.img FROM replies r JOIN users u ON r.postedBy_id = u.user_id WHERE r.reply_id = ?"

	row := db.QueryRow(query, reply_id)

	// 結果セットから投稿をスキャンして取得する
	var reply model.Reply
	var video sql.NullString
	var img sql.NullString
	err = row.Scan(&reply.ReplyID, &reply.Content, &reply.PostedAt, &reply.PostedByID, &reply.PostedToID, &reply.Edited, &reply.DeletedReply, &reply.UserName, &reply.DeletedUser, &reply.IsToPost, &reply.Img, &video, &img)
	if err != nil {
		return nil, err
	}
	if video.Valid {
		reply.Video = video.String
	} else {
		reply.Video = ""
	}
	if img.Valid {
		reply.ImgPost = img.String
	} else {
		reply.ImgPost = ""
	}

	return &reply, nil
}
