package dao

import (
	"database/sql"
	"github.com/WR2233/Hackathon/Backend/model"
)

// 指定されたPost IDに関連する返信を取得する
func GetRepliesByPostID(postID int) ([]model.Reply, error) {
	db, err := GetDB()
	if err != nil {
		return nil, err
	}

	query := "SELECT r.reply_id, r.content, r.postedAt , r.postedBy_id, r.postedTo_id, r.edited AS editedAt, r.deleted AS deleted_reply, u.username, u.deleted, r.IsToPost, u.img, r.video, r.img FROM replies r JOIN users u ON r.postedBy_id = u.user_id WHERE r.postedTo_id = ? AND r.IsToPost = true"
	rows, err := db.Query(query, postID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var replies []model.Reply
	for rows.Next() {
		var reply model.Reply
		var video sql.NullString
		var img sql.NullString
		if err := rows.Scan(&reply.ReplyID, &reply.Content, &reply.PostedAt, &reply.PostedByID, &reply.PostedToID, &reply.Edited, &reply.DeletedReply, &reply.UserName, &reply.DeletedUser, &reply.IsToPost, &reply.Img, &video, &img); err != nil {
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
		replies = append(replies, reply)
	}

	return replies, nil
}
