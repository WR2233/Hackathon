package dao

import (
	"github.com/WR2233/Hackathon/Backend/model"
	"log"
)

// 指定されたPost IDに関連する返信を取得する
func GetRepliesByPostID(postID int) ([]model.Reply, error) {
	db, err := GetDB()
	if err != nil {
		return nil, err
	}

	query := "SELECT r.reply_id, r.content, r.postedAt , r.postedBy_id, r.postedTo_id, r.edited AS editedAt, r.deleted AS deleted_reply, u.username, u.deleted, r.IsToPost, u.img FROM replies r JOIN users u ON r.postedBy_id = u.user_id WHERE r.postedTo_id = ? AND r.IsToPost = true"
	rows, err := db.Query(query, postID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var replies []model.Reply
	for rows.Next() {
		var reply model.Reply
		if err := rows.Scan(&reply.ReplyID, &reply.Content, &reply.PostedAt, &reply.PostedByID, &reply.PostedToID, &reply.Edited, &reply.DeletedReply, &reply.UserName, &reply.DeletedUser, &reply.IsToPost, &reply.Img); err != nil {
			log.Println(err)
			continue
		}
		replies = append(replies, reply)
	}

	return replies, nil
}
